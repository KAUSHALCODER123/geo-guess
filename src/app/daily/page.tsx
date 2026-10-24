"use client";

import React, { useState, useEffect, useMemo, useCallback, Suspense } from "react";
import Link from "next/link";
import {
  Calendar,
  Share2,
  Clock,
  Check,
  Trophy,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getAllCountries } from "@/lib/api/restcountries";
import { FALLBACK_COUNTRIES } from "@/lib/api/fallback-countries";
import {
  generateQuiz,
  stringToSeed,
  calculateScore,
  calculateStreakMultiplier,
} from "@/lib/quiz";
import type { Country } from "@/types/country";
import type { Question, Answer } from "@/lib/quiz/types";
import {
  QuestionCard,
  TimerBar,
  ScoreStreak,
  DailyModal,
  getTimeUntilUtcMidnight,
  generateShareText,
} from "@/components/features/quiz";
import {
  playCorrectSound,
  playWrongSound,
  playStreakSound,
  playVictorySound,
  playClickSound,
} from "@/lib/sound";
import { useProgressStore } from "@/store/useProgressStore";

function getUtcTodayDate(): string {
  return new Date().toISOString().slice(0, 10);
}

function getDailyDayNumber(todayUtc: string): number {
  const epoch = new Date("2026-01-01T00:00:00Z").getTime();
  const current = new Date(`${todayUtc}T00:00:00Z`).getTime();
  return Math.max(1, Math.floor((current - epoch) / (1000 * 60 * 60 * 24)) + 1);
}

function DailyPageContent() {
  const store = useProgressStore();
  const todayUtc = useMemo(() => getUtcTodayDate(), []);
  const dayNumber = useMemo(() => getDailyDayNumber(todayUtc), [todayUtc]);

  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoadingCountries, setIsLoadingCountries] = useState(true);

  // Daily game state
  const [isPlaying, setIsPlaying] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(15);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // Completed share & countdown
  const [countdown, setCountdown] = useState(getTimeUntilUtcMidnight());
  const [copied, setCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Check if user already completed today's challenge
  const todayRecord = store.dailyChallenges?.[todayUtc];

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getTimeUntilUtcMidnight());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch countries
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const data = await getAllCountries();
        if (isMounted) {
          setCountries(data && data.length > 0 ? data : (FALLBACK_COUNTRIES as Country[]));
          setIsLoadingCountries(false);
        }
      } catch {
        if (isMounted) {
          setCountries(FALLBACK_COUNTRIES as Country[]);
          setIsLoadingCountries(false);
        }
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Handle timeout
  const handleTimeOut = useCallback(() => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedOptionId(null);
    playWrongSound();

    const currentQ = questions[currentIndex];
    setStreak(0);

    const answerRecord: Answer = {
      questionId: currentQ.id,
      selectedOptionId: "",
      isCorrect: false,
      timeRemaining: 0,
      pointsEarned: 0,
    };

    setAnswers((prev) => [...prev, answerRecord]);

    store.recordAnswer({
      countryCode: currentQ.targetCountry.cca3,
      mode: "daily_challenge",
      correct: false,
      region: currentQ.targetCountry.region,
    });
  }, [isAnswered, questions, currentIndex, store]);

  // Active question countdown timer
  useEffect(() => {
    if (!isPlaying || isAnswered || timeRemaining <= 0) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, isAnswered, timeRemaining, currentIndex, handleTimeOut]);

  // Launch daily challenge
  const startDaily = () => {
    const seed = stringToSeed(`flagforge-daily-${todayUtc}`);
    const generated = generateQuiz(countries, {
      mode: "flag_to_country",
      count: 10,
      difficulty: "all",
      seed,
    });

    setQuestions(generated);
    setCurrentIndex(0);
    setAnswers([]);
    setScore(0);
    setStreak(0);
    setTimeRemaining(15);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setIsPlaying(true);
  };

  // Option selection
  const handleSelectOption = (optionId: string) => {
    if (isAnswered) return;

    playClickSound();
    setSelectedOptionId(optionId);
    setIsAnswered(true);

    const currentQ = questions[currentIndex];
    const selectedOption = currentQ.options.find((o) => o.id === optionId);
    const isCorrect = selectedOption?.isCorrect ?? false;

    if (isCorrect) {
      playCorrectSound();
      if (streak + 1 >= 3) playStreakSound();
    } else {
      playWrongSound();
    }

    const scoreResult = calculateScore({
      isCorrect,
      timeRemaining,
      streak,
    });

    setScore((prev) => prev + scoreResult.pointsEarned);
    setStreak(scoreResult.newStreak);

    const answerRecord: Answer = {
      questionId: currentQ.id,
      selectedOptionId: optionId,
      isCorrect,
      timeRemaining,
      pointsEarned: scoreResult.pointsEarned,
    };

    setAnswers((prev) => [...prev, answerRecord]);

    store.recordAnswer({
      countryCode: currentQ.targetCountry.cca3,
      mode: "daily_challenge",
      correct: isCorrect,
      region: currentQ.targetCountry.region,
    });
  };

  // Next question or complete challenge
  const handleNextQuestion = () => {
    const isLast = currentIndex >= questions.length - 1;

    if (isLast) {
      setIsPlaying(false);
      playVictorySound();

      // Record daily challenge completion
      const correctAnswersList = answers.map((a) => a.isCorrect);
      const totalCorrect = correctAnswersList.filter(Boolean).length;

      store.recordDailyChallenge({
        date: todayUtc,
        score: totalCorrect,
        total: questions.length,
        answers: correctAnswersList,
      });

      store.recordGameEnd({
        mode: "daily_challenge",
        score,
        total: questions.length,
      });

      setIsModalOpen(true);
      return;
    }

    setCurrentIndex((prev) => prev + 1);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setTimeRemaining(15);
  };

  // Share result text
  const handleShare = async () => {
    if (!todayRecord) return;
    const text = generateShareText(todayRecord, dayNumber);

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `FlagForge Daily #${dayNumber}`,
          text,
        });
        return;
      } catch {
        // Fall back to clipboard
      }
    }

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // 1. ALREADY COMPLETED SCREEN
  if (todayRecord && !isPlaying) {
    const grid = todayRecord.answers.map((ans) => (ans ? "🟩" : "🟥")).join("");

    return (
      <div className="w-full max-w-xl mx-auto space-y-6 py-6">
        <Card className="p-8 text-center space-y-6 border-border bg-gradient-to-b from-card to-muted/20 shadow-md">
          <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary">
            <Trophy className="w-10 h-10 text-primary" />
          </div>

          <div className="space-y-1">
            <Badge variant="outline" className="font-mono text-xs">
              Daily Challenge #{dayNumber}
            </Badge>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
              Challenge Completed!
            </h1>
            <p className="text-sm text-muted-foreground">
              You answered today&apos;s global 10-flag challenge.
            </p>
          </div>

          {/* Results Box */}
          <div className="p-5 rounded-xl border border-border bg-card/60 backdrop-blur-xs space-y-4">
            <div className="flex items-center justify-center gap-2">
              <span className="text-4xl font-black font-mono text-foreground">
                {todayRecord.score}
              </span>
              <span className="text-2xl font-mono text-muted-foreground">
                / {todayRecord.total}
              </span>
              <span className="text-2xl">⭐</span>
            </div>

            <div className="text-2xl tracking-widest font-mono select-all py-1">
              {grid}
            </div>
          </div>

          {/* Countdown */}
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4 text-primary" />
            <span>Next challenge unlocks in:</span>
            <span className="font-mono font-bold text-foreground tabular-nums">
              {countdown}
            </span>
          </div>

          {/* Share CTA */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              onClick={handleShare}
              size="lg"
              className="flex-1 font-bold"
              leftIcon={copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
            >
              {copied ? "Copied to Clipboard!" : "Share Results"}
            </Button>

            <Button asChild size="lg" variant="outline" className="flex-1">
              <Link href="/play">
                Practice More Flags
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
        </Card>

        {todayRecord && (
          <DailyModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            record={todayRecord}
            dayNumber={dayNumber}
          />
        )}
      </div>
    );
  }

  // 2. ACTIVE DAILY GAME SCREEN
  if (isPlaying) {
    const currentQ = questions[currentIndex];
    const multiplier = calculateStreakMultiplier(streak);

    return (
      <div className="w-full max-w-3xl mx-auto space-y-4 py-4">
        <div className="flex items-center justify-between pb-1">
          <Badge variant="outline" className="font-mono text-xs font-bold">
            Daily Challenge #{dayNumber} • 10 Questions
          </Badge>
          <span className="text-xs text-muted-foreground font-mono">
            {todayUtc} (UTC)
          </span>
        </div>

        <ScoreStreak
          score={score}
          streak={streak}
          multiplier={multiplier}
          livesRemaining={null}
          maxLives={null}
          currentIndex={currentIndex}
          totalQuestions={questions.length}
        />

        <TimerBar
          timeRemaining={timeRemaining}
          totalTime={15}
          isPaused={false}
        />

        {currentQ && (
          <QuestionCard
            question={currentQ}
            selectedOptionId={selectedOptionId}
            isAnswered={isAnswered}
            onSelectOption={handleSelectOption}
            onNextQuestion={handleNextQuestion}
            isLastQuestion={currentIndex === questions.length - 1}
          />
        )}
      </div>
    );
  }

  // 3. LAUNCH DAILY CHALLENGE SCREEN
  return (
    <div className="w-full max-w-xl mx-auto space-y-6 py-6">
      <Card className="p-8 text-center space-y-6 border-border shadow-md">
        <div className="inline-flex p-4 rounded-2xl bg-primary/10 text-primary mx-auto">
          <Calendar className="w-10 h-10 text-primary" />
        </div>

        <div className="space-y-2">
          <Badge variant="outline" className="font-mono text-xs font-bold">
            Daily Challenge #{dayNumber}
          </Badge>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            Today&apos;s Global Challenge
          </h1>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            10 identical flag questions for every player on Earth today. Compete for the highest score and share your grid!
          </p>
        </div>

        {/* Challenge Attributes */}
        <div className="grid grid-cols-3 gap-3 p-4 rounded-xl border border-border bg-muted/30">
          <div>
            <span className="text-xs text-muted-foreground block">Questions</span>
            <span className="text-lg font-mono font-bold text-foreground">10 Flags</span>
          </div>
          <div>
            <span className="text-xs text-muted-foreground block">Timer</span>
            <span className="text-lg font-mono font-bold text-foreground">15s / Q</span>
          </div>
          <div>
            <span className="text-xs text-muted-foreground block">Reset</span>
            <span className="text-lg font-mono font-bold text-foreground">Midnight UTC</span>
          </div>
        </div>

        <Button
          onClick={startDaily}
          disabled={isLoadingCountries}
          size="lg"
          className="w-full h-13 text-base font-bold shadow-md"
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          {isLoadingCountries ? "Loading Today's Challenge..." : "Begin Today's Challenge"}
        </Button>
      </Card>
    </div>
  );
}

export default function DailyPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <span className="text-muted-foreground">Loading Daily Challenge...</span>
        </div>
      }
    >
      <DailyPageContent />
    </Suspense>
  );
}
