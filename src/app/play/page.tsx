"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Sparkles,
  Timer,
  Heart,
  Globe2,
  SlidersHorizontal,
  ChevronRight,
  Pause,
  Flag,
  Landmark,
  Compass,
  TrendingUp,
  MapPin,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { getAllCountries } from "@/lib/api/restcountries";
import { FALLBACK_COUNTRIES } from "@/lib/api/fallback-countries";
import {
  generateQuiz,
  calculateScore,
  calculateStreakMultiplier,
} from "@/lib/quiz";
import type { Country } from "@/types/country";
import type {
  Difficulty,
  QuizMode,
  Question,
  Answer,
} from "@/lib/quiz/types";
import {
  QuestionCard,
  TimerBar,
  ScoreStreak,
  GameOverReview,
} from "@/components/features/quiz";
import {
  playCorrectSound,
  playWrongSound,
  playStreakSound,
  playClickSound,
} from "@/lib/sound";
import { useProgressStore } from "@/store/useProgressStore";

type PlayPhase = "config" | "playing" | "game_over";

const QUIZ_MODES: Array<{
  id: QuizMode;
  title: string;
  description: string;
  icon: React.ReactNode;
}> = [
  {
    id: "flag_to_country",
    title: "Flag to Country",
    description: "Identify the country from its national flag",
    icon: <Flag className="w-5 h-5 text-primary" />,
  },
  {
    id: "country_to_capital",
    title: "Country to Capital",
    description: "Test your capital knowledge for given nations",
    icon: <Landmark className="w-5 h-5 text-amber-500" />,
  },
  {
    id: "capital_to_country",
    title: "Capital to Country",
    description: "Match the capital city to its sovereign country",
    icon: <Compass className="w-5 h-5 text-sky-500" />,
  },
  {
    id: "higher_lower",
    title: "Higher / Lower",
    description: "Compare population and territorial surface area",
    icon: <TrendingUp className="w-5 h-5 text-emerald-500" />,
  },
  {
    id: "which_borders",
    title: "Bordering Nations",
    description: "Identify countries that share a land frontier",
    icon: <Globe2 className="w-5 h-5 text-purple-500" />,
  },
  {
    id: "map_location",
    title: "World Region",
    description: "Determine the continental region and subregion",
    icon: <MapPin className="w-5 h-5 text-rose-500" />,
  },
];

const REGIONS = [
  { id: "all", label: "Worldwide" },
  { id: "Africa", label: "Africa" },
  { id: "Americas", label: "Americas" },
  { id: "Asia", label: "Asia" },
  { id: "Europe", label: "Europe" },
  { id: "Oceania", label: "Oceania" },
];

const DIFFICULTIES: Array<{ id: Difficulty; label: string; desc: string }> = [
  { id: "all", label: "All Tiers", desc: "Balanced mix of every nation" },
  { id: "easy", label: "Easy", desc: "Population > 25M & iconic nations" },
  { id: "medium", label: "Medium", desc: "5M – 25M population" },
  { id: "hard", label: "Hard", desc: "< 5M population & island nations" },
];

function PlayPageContent() {
  const searchParams = useSearchParams();
  const store = useProgressStore();

  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoadingCountries, setIsLoadingCountries] = useState(true);

  // Configuration state initialized from searchParams if present
  const [mode, setMode] = useState<QuizMode>(() => {
    const urlMode = searchParams?.get("mode") as QuizMode | undefined;
    return urlMode && QUIZ_MODES.some((m) => m.id === urlMode)
      ? urlMode
      : "flag_to_country";
  });
  const [region, setRegion] = useState(() => {
    const urlRegion = searchParams?.get("region");
    return urlRegion && REGIONS.some((r) => r.id.toLowerCase() === urlRegion.toLowerCase())
      ? urlRegion
      : "all";
  });
  const [difficulty, setDifficulty] = useState<Difficulty>(() => {
    const urlDiff = searchParams?.get("difficulty") as Difficulty | undefined;
    return urlDiff && DIFFICULTIES.some((d) => d.id === urlDiff)
      ? urlDiff
      : "all";
  });
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [timerSeconds, setTimerSeconds] = useState<number>(15);
  const [enableLives, setEnableLives] = useState<boolean>(true);

  // Active game state
  const [phase, setPhase] = useState<PlayPhase>("config");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [livesRemaining, setLivesRemaining] = useState<number | null>(3);
  const [timeRemaining, setTimeRemaining] = useState(15);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [gameStartTime, setGameStartTime] = useState(0);
  const [gameDurationSeconds, setGameDurationSeconds] = useState(0);

  // Load countries
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

  // Esc key listener for pause menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && phase === "playing") {
        e.preventDefault();
        setIsPaused((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [phase]);

  // Handle Timeout (counts as incorrect answer)
  const handleTimeOut = useCallback(() => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedOptionId(null);
    playWrongSound();

    const currentQ = questions[currentIndex];
    const newStreak = 0;
    setStreak(newStreak);

    let nextLives = livesRemaining;
    if (enableLives && livesRemaining !== null) {
      nextLives = livesRemaining - 1;
      setLivesRemaining(nextLives);
    }

    const answerRecord: Answer = {
      questionId: currentQ.id,
      selectedOptionId: "",
      isCorrect: false,
      timeRemaining: 0,
      pointsEarned: 0,
    };

    setAnswers((prev) => [...prev, answerRecord]);

    // Record to store
    store.recordAnswer({
      countryCode: currentQ.targetCountry.cca3,
      mode,
      correct: false,
      region: currentQ.targetCountry.region,
    });
  }, [
    isAnswered,
    questions,
    currentIndex,
    livesRemaining,
    enableLives,
    mode,
    store,
  ]);

  // Timer countdown hook for current question
  useEffect(() => {
    if (phase !== "playing" || isPaused || isAnswered || timerSeconds <= 0) {
      return;
    }

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
  }, [phase, isPaused, isAnswered, timerSeconds, currentIndex, handleTimeOut]);

  // Start new game
  const startGame = useCallback(
    (customQuestions?: Question[]) => {
      const activeQuestions =
        customQuestions ||
        generateQuiz(countries, {
          mode,
          count: questionCount,
          difficulty,
          region,
        });

      if (activeQuestions.length === 0) return;

      setQuestions(activeQuestions);
      setCurrentIndex(0);
      setAnswers([]);
      setScore(0);
      setStreak(0);
      setLivesRemaining(enableLives ? 3 : null);
      setTimeRemaining(timerSeconds);
      setIsPaused(false);
      setSelectedOptionId(null);
      setIsAnswered(false);
      setGameStartTime(Date.now());
      setPhase("playing");
    },
    [countries, mode, questionCount, difficulty, region, enableLives, timerSeconds]
  );

  // Handle option selection
  const handleSelectOption = (optionId: string) => {
    if (isAnswered || isPaused) return;

    playClickSound();
    setSelectedOptionId(optionId);
    setIsAnswered(true);

    const currentQ = questions[currentIndex];
    const selectedOption = currentQ.options.find((o) => o.id === optionId);
    const isCorrect = selectedOption?.isCorrect ?? false;

    if (isCorrect) {
      playCorrectSound();
      if (streak + 1 >= 3) {
        playStreakSound();
      }
    } else {
      playWrongSound();
    }

    const scoreResult = calculateScore({
      isCorrect,
      timeRemaining: timerSeconds > 0 ? timeRemaining : 0,
      streak,
    });

    setScore((prev) => prev + scoreResult.pointsEarned);
    setStreak(scoreResult.newStreak);

    let nextLives = livesRemaining;
    if (!isCorrect && enableLives && livesRemaining !== null) {
      nextLives = livesRemaining - 1;
      setLivesRemaining(nextLives);
    }

    const answerRecord: Answer = {
      questionId: currentQ.id,
      selectedOptionId: optionId,
      isCorrect,
      timeRemaining,
      pointsEarned: scoreResult.pointsEarned,
    };

    setAnswers((prev) => [...prev, answerRecord]);

    // Record to persistent store
    store.recordAnswer({
      countryCode: currentQ.targetCountry.cca3,
      mode,
      correct: isCorrect,
      region: currentQ.targetCountry.region,
    });
  };

  // Next question or finish game
  const handleNextQuestion = () => {
    const isLast = currentIndex >= questions.length - 1;
    const isOutOfLives = enableLives && livesRemaining !== null && livesRemaining <= 0;

    if (isLast || isOutOfLives) {
      const duration = Math.round((Date.now() - gameStartTime) / 1000);
      setGameDurationSeconds(duration);
      setPhase("game_over");

      // Record game end in store
      store.recordGameEnd({
        mode,
        score,
        total: questions.length,
      });
      return;
    }

    setCurrentIndex((prev) => prev + 1);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setTimeRemaining(timerSeconds);
  };

  // Retry missed questions
  const handleRetryMissed = (missedQuestions: Question[]) => {
    startGame(missedQuestions);
  };

  // 1. CONFIG SELECTOR SCREEN
  if (phase === "config") {
    return (
      <div className="w-full max-w-4xl mx-auto space-y-8 py-4">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Vexillology & Geography Arena
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">
            Quiz Challenge
          </h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-lg mx-auto">
            Choose your game mode, tune the difficulty, and test your knowledge against the world.
          </p>
        </div>

        {/* Mode Selection Grid */}
        <div className="space-y-3">
          <label className="text-sm font-bold uppercase tracking-wider text-foreground">
            1. Select Mode
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {QUIZ_MODES.map((m) => {
              const isSelected = mode === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMode(m.id)}
                  className={`p-4 rounded-xl border text-left transition-all select-none flex flex-col justify-between gap-3 ${
                    isSelected
                      ? "border-primary bg-primary/10 shadow-sm ring-1 ring-primary"
                      : "border-border bg-card hover:border-primary/50 hover:bg-muted/30"
                  }`}
                >
                  <div className="p-2.5 rounded-lg bg-card w-fit border border-border shadow-2xs">
                    {m.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-foreground">{m.title}</h3>
                    <p className="text-xs text-muted-foreground pt-0.5">{m.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Configuration Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Region Filter */}
          <Card className="p-5 space-y-3 border-border">
            <label className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-primary" />
              2. World Region
            </label>
            <div className="grid grid-cols-3 gap-2">
              {REGIONS.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRegion(r.id)}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                    region.toLowerCase() === r.id.toLowerCase()
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted/40 text-foreground border-border hover:bg-muted"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </Card>

          {/* Difficulty Tier */}
          <Card className="p-5 space-y-3 border-border">
            <label className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-primary" />
              3. Difficulty Tier
            </label>
            <div className="grid grid-cols-2 gap-2">
              {DIFFICULTIES.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setDifficulty(d.id)}
                  className={`p-2.5 rounded-lg text-left border transition-all ${
                    difficulty === d.id
                      ? "bg-primary/10 border-primary text-foreground ring-1 ring-primary"
                      : "bg-muted/40 text-foreground border-border hover:bg-muted"
                  }`}
                >
                  <span className="font-bold text-xs block">{d.label}</span>
                  <span className="text-[10px] text-muted-foreground line-clamp-1">{d.desc}</span>
                </button>
              ))}
            </div>
          </Card>

          {/* Question Count */}
          <Card className="p-5 space-y-3 border-border">
            <label className="text-sm font-bold uppercase tracking-wider text-foreground">
              4. Number of Questions
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[10, 20, 30].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setQuestionCount(num)}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                    questionCount === num
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted/40 text-foreground border-border hover:bg-muted"
                  }`}
                >
                  {num} Questions
                </button>
              ))}
            </div>
          </Card>

          {/* Timer & Lives Mode */}
          <Card className="p-5 space-y-3 border-border">
            <label className="text-sm font-bold uppercase tracking-wider text-foreground">
              5. Rules & Pacing
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setTimerSeconds((prev) => (prev === 15 ? 10 : prev === 10 ? 0 : 15))}
                className="p-2.5 rounded-lg text-left border border-border bg-muted/40 hover:bg-muted transition-all"
              >
                <div className="flex items-center gap-1.5 text-xs font-bold">
                  <Timer className="w-3.5 h-3.5 text-primary" />
                  <span>Timer</span>
                </div>
                <span className="text-[11px] text-muted-foreground">
                  {timerSeconds > 0 ? `${timerSeconds}s per question` : "Untimed"}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setEnableLives((prev) => !prev)}
                className="p-2.5 rounded-lg text-left border border-border bg-muted/40 hover:bg-muted transition-all"
              >
                <div className="flex items-center gap-1.5 text-xs font-bold">
                  <Heart className="w-3.5 h-3.5 text-rose-500" />
                  <span>Lives</span>
                </div>
                <span className="text-[11px] text-muted-foreground">
                  {enableLives ? "3 Lives" : "Casual (Unlimited)"}
                </span>
              </button>
            </div>
          </Card>
        </div>

        {/* Start Game CTA */}
        <div className="flex justify-center pt-2">
          <Button
            onClick={() => startGame()}
            disabled={isLoadingCountries}
            size="lg"
            className="w-full sm:w-80 h-14 text-base font-bold shadow-lg"
            rightIcon={<ChevronRight className="w-5 h-5" />}
          >
            {isLoadingCountries ? "Loading Countries..." : "Start Quiz"}
          </Button>
        </div>
      </div>
    );
  }

  // 2. ACTIVE GAME SCREEN
  if (phase === "playing") {
    const currentQ = questions[currentIndex];
    const multiplier = calculateStreakMultiplier(streak);

    return (
      <div className="w-full max-w-3xl mx-auto space-y-4 py-4">
        {/* Top Header: Score, Streak, Lives & Pause */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <ScoreStreak
              score={score}
              streak={streak}
              multiplier={multiplier}
              livesRemaining={livesRemaining}
              maxLives={enableLives ? 3 : null}
              currentIndex={currentIndex}
              totalQuestions={questions.length}
            />

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsPaused(true)}
              className="ml-2 shrink-0"
              aria-label="Pause Game"
            >
              <Pause className="w-4 h-4" />
            </Button>
          </div>

          {timerSeconds > 0 && (
            <TimerBar
              timeRemaining={timeRemaining}
              totalTime={timerSeconds}
              isPaused={isPaused}
            />
          )}
        </div>

        {/* Question Card */}
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

        {/* Pause Dialog */}
        <Dialog open={isPaused} onOpenChange={setIsPaused}>
          <DialogContent className="max-w-xs text-center space-y-4">
            <DialogHeader className="text-center items-center">
              <DialogTitle className="text-2xl font-black">Game Paused</DialogTitle>
              <DialogDescription>
                Take a breath! Your timer is paused.
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-2 pt-2">
              <Button onClick={() => setIsPaused(false)} size="lg">
                Resume
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsPaused(false);
                  startGame();
                }}
              >
                Restart Quiz
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setIsPaused(false);
                  setPhase("config");
                }}
              >
                Quit to Menu
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // 3. GAME OVER SCREEN
  return (
    <GameOverReview
      score={score}
      questions={questions}
      answers={answers}
      durationSeconds={gameDurationSeconds}
      onPlayAgain={() => startGame()}
      onRetryMissed={handleRetryMissed}
    />
  );
}

export default function PlayPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <span className="text-muted-foreground">Loading Arena...</span>
        </div>
      }
    >
      <PlayPageContent />
    </Suspense>
  );
}
