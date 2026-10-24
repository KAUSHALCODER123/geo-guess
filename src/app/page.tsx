"use client";

import * as React from "react";
import Link from "next/link";
import {
  Compass,
  Trophy,
  Globe,
  Layers,
  Flame,
  Target,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FlagImage } from "@/components/common/flag-image";
import { fireConfetti } from "@/components/common/confetti-burst";

// Quick practice quiz data
const PRACTICE_QUESTIONS = [
  {
    id: 1,
    countryCode: "btn",
    countryName: "Bhutan",
    question: "Which Himalayan nation features a white dragon ('Druk') holding jewels of wealth?",
    options: ["Bhutan", "Nepal", "Mongolia", "Myanmar"],
    correct: "Bhutan",
    fact: "The thunder dragon Druk is a national symbol representing Bhutan's Dzongkha name, Druk Yul ('Land of the Thunder Dragon').",
  },
  {
    id: 2,
    countryCode: "npl",
    countryName: "Nepal",
    question:
      "Which country holds the distinction of having the only non-quadrilateral national flag?",
    options: ["Switzerland", "Nepal", "Vatican City", "Monaco"],
    correct: "Nepal",
    fact: "Nepal's double-pennant flag symbolizes the Himalayan mountains and the two major religions of the country: Hinduism and Buddhism.",
  },
  {
    id: 3,
    countryCode: "syc",
    countryName: "Seychelles",
    question:
      "Which Indian Ocean archipelago flies this vibrant five-color radiating sunburst flag?",
    options: ["Mauritius", "Madagascar", "Seychelles", "Maldives"],
    correct: "Seychelles",
    fact: "Adopted in 1996, the radiating diagonal bands represent a dynamic new nation striding boldly toward the future.",
  },
];

export default function HomePage() {
  // UTC Countdown Timer for Daily Challenge
  const [timeLeft, setTimeLeft] = React.useState({ hours: 0, minutes: 0, seconds: 0 });

  React.useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const nextUtcMidnight = new Date(
        Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, 0, 0, 0)
      );
      const diff = Math.max(0, nextUtcMidnight.getTime() - now.getTime());
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft({ hours, minutes, seconds });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, []);

  // Live user progress state (gracefully read from localStorage or default)
  const [userStats, setUserStats] = React.useState({
    streak: 4,
    gamesPlayed: 18,
    accuracy: 86,
    bestScore: 940,
  });

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem("flagforge-stats");
      if (stored) {
        const parsed = JSON.parse(stored);
        setUserStats((prev) => ({ ...prev, ...parsed }));
      }
    } catch {
      // ignore
    }
  }, []);

  // Quick Practice State
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [selectedOption, setSelectedOption] = React.useState<string | null>(null);
  const [isAnswered, setIsAnswered] = React.useState(false);
  const [practiceScore, setPracticeScore] = React.useState(0);
  const [practiceFinished, setPracticeFinished] = React.useState(false);

  const currentQ = PRACTICE_QUESTIONS[currentQuestionIndex];

  const handleSelectOption = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);

    const isCorrect = option === currentQ.correct;
    if (isCorrect) {
      setPracticeScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < PRACTICE_QUESTIONS.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setPracticeFinished(true);
      fireConfetti({ particleCount: 90, spread: 80 });
    }
  };

  const handleResetPractice = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setPracticeScore(0);
    setPracticeFinished(false);
  };

  return (
    <div className="relative min-h-screen bg-atlas-grid">
      {/* Background Compass Glow */}
      <div className="pointer-events-none absolute inset-0 bg-compass-radial opacity-70" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] bg-brand-wash" />

      {/* Main Container */}
      <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        {/* ======================================================== */}
        {/* 1. HERO SECTION */}
        {/* ======================================================== */}
        <section className="text-center space-y-6 pt-6 pb-2">
          {/* Subtle Tag Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary backdrop-blur-md">
            <Compass className="h-3.5 w-3.5 animate-spin duration-[10000ms]" />
            <span>Interactive World Atlas & Vexillology Arena</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground max-w-4xl mx-auto leading-[1.1]">
            Forge your world knowledge with{" "}
            <span className="text-gradient-brand">
              every flag.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Embark on a cartographic journey across 250+ nations. Test your instincts in timed
            vexillology sprints, conquer daily challenges, and compare sovereign demographics with
            precision.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <Button
              asChild
              size="lg"
              variant="accent"
              className="px-7 text-base font-bold shadow-lg"
            >
              <Link href="/play">
                <Trophy className="h-5 w-5 mr-2" />
                Play Quiz
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="px-7 text-base bg-card/80 backdrop-blur-xs hover:border-primary/50"
            >
              <Link href="/explore">
                <Globe className="h-5 w-5 mr-2 text-primary" />
                Explore Countries
              </Link>
            </Button>

            <Button asChild size="lg" variant="secondary" className="px-6 text-base">
              <Link href="/compare">
                <Layers className="h-5 w-5 mr-2 text-muted-foreground" />
                Compare Nations
              </Link>
            </Button>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 2. LIVE PROGRESS & DAILY CHALLENGE HIGHLIGHTS */}
        {/* ======================================================== */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Daily Challenge Card (7 cols) */}
          <Card className="lg:col-span-7 overflow-hidden border-border bg-card/90 backdrop-blur-md relative">
            <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 w-48 h-48 rounded-full bg-accent/10 blur-3xl pointer-events-none" />
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge
                  variant="accent"
                  className="font-semibold uppercase tracking-wider text-[11px]"
                >
                  Daily Challenge
                </Badge>
                {/* UTC Countdown Timer */}
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-muted-foreground bg-muted/80 px-2.5 py-1 rounded-md">
                  <Clock className="h-3.5 w-3.5 text-accent" />
                  <span>
                    Resets in {String(timeLeft.hours).padStart(2, "0")}:
                    {String(timeLeft.minutes).padStart(2, "0")}:
                    {String(timeLeft.seconds).padStart(2, "0")} UTC
                  </span>
                </div>
              </div>
              <CardTitle className="text-2xl mt-2 font-bold">
                Today&apos;s Global 10-Round Arena
              </CardTitle>
              <CardDescription>
                Identical daily seed for all players worldwide. Test your memory against global
                vexillologists.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Preview flags row */}
              <div className="flex items-center gap-3 overflow-x-auto py-2">
                {["is", "br", "ke", "kr", "pt", "ca", "nz", "pe"].map((code) => (
                  <div
                    key={code}
                    className="w-14 h-9 shrink-0 rounded-sm overflow-hidden border border-border/80 shadow-2xs hover:scale-105 transition-transform"
                  >
                    <FlagImage
                      countryCode={code}
                      width={56}
                      height={36}
                      aspectRatio="3/2"
                      className="h-full w-full"
                    />
                  </div>
                ))}
                <div className="flex items-center justify-center w-14 h-9 shrink-0 rounded-sm bg-muted text-xs font-mono font-bold text-muted-foreground border border-border/50">
                  +2
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground pt-1 border-t border-border/40">
                <span>10 Questions • Flags, Capitals & Border Clues</span>
                <span className="font-semibold text-foreground">Standard Difficulty</span>
              </div>
            </CardContent>

            <CardFooter className="pt-2">
              <Button asChild variant="accent" className="w-full sm:w-auto font-bold">
                <Link href="/daily">
                  <Zap className="h-4 w-4 mr-2" />
                  Enter Today&apos;s Challenge
                </Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Live User Progress Card (5 cols) */}
          <Card className="lg:col-span-5 border-border bg-card/90 backdrop-blur-md">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="font-mono text-[11px]">
                  Player Log
                </Badge>
                <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                  <Flame className="h-4 w-4 fill-amber-500" />
                  <span>{userStats.streak} Day Streak</span>
                </div>
              </div>
              <CardTitle className="text-xl font-bold">Your Navigational Stats</CardTitle>
              <CardDescription>
                Synced locally across all FlagForge quiz and challenge runs.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground block">
                    Accuracy
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl font-extrabold text-foreground font-mono">
                      {userStats.accuracy}%
                    </span>
                    <Target className="h-4 w-4 text-emerald-500" />
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground block">
                    Best Score
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl font-extrabold text-foreground font-mono">
                      {userStats.bestScore}
                    </span>
                    <Trophy className="h-4 w-4 text-amber-500" />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Atlas Mastery Progress</span>
                  <span className="font-mono font-semibold text-foreground">
                    {userStats.gamesPlayed} / 50 Games
                  </span>
                </div>
                <Progress value={(userStats.gamesPlayed / 50) * 100} variant="default" />
              </div>
            </CardContent>

            <CardFooter className="pt-2">
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link href="/stats">
                  View Full Performance Analytics
                  <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </section>

        {/* ======================================================== */}
        {/* 3. QUICK PRACTICE: 3-QUESTION MINI TEASER */}
        {/* ======================================================== */}
        <section className="rounded-2xl border border-primary/30 bg-card/95 p-6 sm:p-8 shadow-lg relative overflow-hidden">
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-accent" />
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                    Quick Practice: Vexillology Teaser
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                  Try 3 fast questions right here—no sign-up or page reload needed.
                </p>
              </div>

              {!practiceFinished && (
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="font-mono text-xs">
                    Question {currentQuestionIndex + 1} of {PRACTICE_QUESTIONS.length}
                  </Badge>
                  <span className="text-xs font-bold text-primary font-mono">
                    Score: {practiceScore}
                  </span>
                </div>
              )}
            </div>

            {/* Question Body */}
            {!practiceFinished ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  {/* Flag Thumbnail Display */}
                  <div className="md:col-span-5 flex justify-center">
                    <div className="w-full max-w-[260px] rounded-lg overflow-hidden border border-border shadow-md">
                      <FlagImage
                        countryCode={currentQ.countryCode}
                        countryName={currentQ.countryName}
                        width={300}
                        height={200}
                        aspectRatio="3/2"
                        className="w-full h-auto"
                      />
                    </div>
                  </div>

                  {/* Question Prompt & Options */}
                  <div className="md:col-span-7 space-y-4">
                    <p className="text-base sm:text-lg font-semibold text-foreground leading-snug">
                      {currentQ.question}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {currentQ.options.map((option) => {
                        const isChosen = selectedOption === option;
                        const isTheCorrectOne = option === currentQ.correct;

                        let buttonStyle = "border-border bg-card hover:bg-muted text-foreground";
                        if (isAnswered) {
                          if (isTheCorrectOne) {
                            buttonStyle = "border-success bg-success/15 text-success font-bold";
                          } else if (isChosen) {
                            buttonStyle =
                              "border-destructive bg-destructive/15 text-destructive line-through";
                          } else {
                            buttonStyle = "opacity-50 border-border bg-muted/40";
                          }
                        }

                        return (
                          <button
                            key={option}
                            type="button"
                            disabled={isAnswered}
                            onClick={() => handleSelectOption(option)}
                            className={`flex items-center justify-between p-3 rounded-lg border text-sm text-left transition-all font-medium focus-visible:outline-2 focus-visible:outline-[var(--ring)] ${buttonStyle}`}
                          >
                            <span>{option}</span>
                            {isAnswered && isTheCorrectOne && (
                              <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                            )}
                            {isAnswered && isChosen && !isTheCorrectOne && (
                              <XCircle className="h-4 w-4 text-destructive shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Feedback & Fact Box */}
                {isAnswered && (
                  <div className="rounded-lg bg-muted/60 p-4 border border-border/80 space-y-3 animate-in fade-in-50">
                    <div className="flex items-center gap-2">
                      {selectedOption === currentQ.correct ? (
                        <div className="flex items-center gap-1.5 text-success font-bold text-sm">
                          <CheckCircle2 className="h-4 w-4" />
                          <span>Correct! Outstanding recall.</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-destructive font-bold text-sm">
                          <XCircle className="h-4 w-4" />
                          <span>Incorrect. The answer is {currentQ.correct}.</span>
                        </div>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      💡 <strong>Did you know?</strong> {currentQ.fact}
                    </p>

                    <div className="flex justify-end pt-1">
                      <Button
                        onClick={handleNextQuestion}
                        variant="default"
                        size="sm"
                        className="font-semibold"
                      >
                        {currentQuestionIndex + 1 === PRACTICE_QUESTIONS.length
                          ? "View Final Score"
                          : "Next Question"}
                        <ArrowRight className="h-4 w-4 ml-1.5" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Completion Screen */
              <div className="text-center py-6 space-y-4">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-accent mb-2">
                  <Trophy className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  Practice Complete! You scored {practiceScore} / {PRACTICE_QUESTIONS.length}
                </h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  {practiceScore === 3
                    ? "Flawless score! You are well primed for the competitive ranked Arena."
                    : "Great warm-up! Ready to explore the full catalog or challenge the clock?"}
                </p>
                <div className="flex items-center justify-center gap-3 pt-2">
                  <Button variant="outline" size="sm" onClick={handleResetPractice}>
                    <RotateCcw className="h-4 w-4 mr-1.5" />
                    Try Again
                  </Button>
                  <Button asChild variant="accent" size="sm">
                    <Link href="/play">
                      Enter Full Quiz Arena
                      <ArrowRight className="h-4 w-4 ml-1.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ======================================================== */}
        {/* 4. FEATURES AT A GLANCE */}
        {/* ======================================================== */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Built for Geographers & Vexillology Enthusiasts
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              Multiple deep game modes engineered to build spatial memory, historical context, and
              cartographic speed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <Card className="hover:border-primary/50 transition-all duration-200">
              <CardHeader className="pb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary mb-2">
                  <Trophy className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg">Flag Quiz Arena</CardTitle>
                <CardDescription>
                  Multiple choice, speed sprint, and reverse flag-to-country challenges with streak
                  multipliers.
                </CardDescription>
              </CardHeader>
              <CardFooter className="pt-0">
                <Link
                  href="/play"
                  className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
                >
                  Play Flag Quiz <ArrowRight className="h-3 w-3" />
                </Link>
              </CardFooter>
            </Card>

            {/* Feature 2 */}
            <Card className="hover:border-primary/50 transition-all duration-200">
              <CardHeader className="pb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-400/10 text-sky-400 mb-2">
                  <Globe className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg">Capital Match</CardTitle>
                <CardDescription>
                  Pair sovereign nations with their political capitals across Africa, Europe, the
                  Americas, Asia, and Oceania.
                </CardDescription>
              </CardHeader>
              <CardFooter className="pt-0">
                <Link
                  href="/play?mode=capital_to_country"
                  className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
                >
                  Practice Capitals <ArrowRight className="h-3 w-3" />
                </Link>
              </CardFooter>
            </Card>

            {/* Feature 3 */}
            <Card className="hover:border-primary/50 transition-all duration-200">
              <CardHeader className="pb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/15 text-accent mb-2">
                  <Layers className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg">Higher or Lower</CardTitle>
                <CardDescription>
                  Demographic showdowns comparing population sizes, surface landmasses, and
                  geographic coordinates.
                </CardDescription>
              </CardHeader>
              <CardFooter className="pt-0">
                <Link
                  href="/compare"
                  className="text-xs font-semibold text-accent hover:underline inline-flex items-center gap-1"
                >
                  Test Metrics <ArrowRight className="h-3 w-3" />
                </Link>
              </CardFooter>
            </Card>

            {/* Feature 4 */}
            <Card className="hover:border-primary/50 transition-all duration-200">
              <CardHeader className="pb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500 mb-2">
                  <Compass className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg">Border Explorer</CardTitle>
                <CardDescription>
                  Trace frontier neighbors from landlocked central powers to archipelago island
                  nations.
                </CardDescription>
              </CardHeader>
              <CardFooter className="pt-0">
                <Link
                  href="/explore"
                  className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
                >
                  Explore Frontiers <ArrowRight className="h-3 w-3" />
                </Link>
              </CardFooter>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
