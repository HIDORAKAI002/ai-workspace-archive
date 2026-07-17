"use client";

import { useState } from "react";
import {
  ArrowRight,
  Check,
  CircleDot,
  Gauge,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";

type LoopStageId = "frame" | "act" | "observe" | "evaluate" | "adapt";

interface LoopStage {
  id: LoopStageId;
  label: string;
  verb: string;
}

interface LoopCycle {
  action: string;
  observation: string;
  evaluation: string;
  adaptation: string;
  progress: number;
  openIssues: number;
}

interface LoopScenario {
  id: string;
  label: string;
  goal: string;
  stopRule: string;
  evidence: string;
  cycles: LoopCycle[];
}

interface LoopEngineeringLabContent {
  eyebrow: string;
  title: string;
  description: string;
  chooseScenarioLabel: string;
  goalLabel: string;
  stopRuleLabel: string;
  evidenceLabel: string;
  iterationLabel: string;
  progressLabel: string;
  openIssuesLabel: string;
  currentSignalLabel: string;
  advanceLabel: string;
  nextIterationLabel: string;
  resetLabel: string;
  completeLabel: string;
  completeDescription: string;
  stages: LoopStage[];
  scenarios: LoopScenario[];
}

interface LoopEngineeringLabProps {
  content: LoopEngineeringLabContent;
}

const stageStyles: Record<LoopStageId, string> = {
  frame: "border-cyan-600/30 bg-cyan-50 text-cyan-900 dark:border-cyan-400/50 dark:bg-cyan-400/10 dark:text-cyan-200",
  act: "border-amber-600/30 bg-amber-50 text-amber-900 dark:border-amber-400/50 dark:bg-amber-400/10 dark:text-amber-200",
  observe: "border-sky-600/30 bg-sky-50 text-sky-900 dark:border-sky-400/50 dark:bg-sky-400/10 dark:text-sky-200",
  evaluate: "border-fuchsia-600/30 bg-fuchsia-50 text-fuchsia-900 dark:border-fuchsia-400/50 dark:bg-fuchsia-400/10 dark:text-fuchsia-200",
  adapt: "border-lime-600/30 bg-lime-50 text-lime-900 dark:border-lime-400/50 dark:bg-lime-400/10 dark:text-lime-200",
};

export function LoopEngineeringLab({ content }: LoopEngineeringLabProps) {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [cycleIndex, setCycleIndex] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const scenario = content.scenarios[scenarioIndex];
  const cycle = scenario.cycles[cycleIndex];
  const stage = content.stages[stageIndex];
  const previousProgress = cycleIndex > 0 ? scenario.cycles[cycleIndex - 1].progress : 0;
  const visibleProgress = stageIndex >= 3 ? cycle.progress : previousProgress;
  const visibleOpenIssues = stageIndex >= 3
    ? cycle.openIssues
    : cycleIndex > 0
      ? scenario.cycles[cycleIndex - 1].openIssues
      : scenario.cycles[0].openIssues + 1;

  const getSignal = () => {
    switch (stage.id) {
      case "frame":
        return scenario.goal;
      case "act":
        return cycle.action;
      case "observe":
        return cycle.observation;
      case "evaluate":
        return cycle.evaluation;
      case "adapt":
        return cycle.adaptation;
    }
  };

  const reset = (nextScenarioIndex = scenarioIndex) => {
    setScenarioIndex(nextScenarioIndex);
    setCycleIndex(0);
    setStageIndex(0);
    setIsComplete(false);
  };

  const advance = () => {
    if (isComplete) return;

    if (stageIndex < content.stages.length - 1) {
      setStageIndex((current) => current + 1);
      return;
    }

    if (cycleIndex < scenario.cycles.length - 1) {
      setCycleIndex((current) => current + 1);
      setStageIndex(0);
      return;
    }

    setIsComplete(true);
  };

  const buttonLabel = stageIndex === content.stages.length - 1 && cycleIndex < scenario.cycles.length - 1
    ? content.nextIterationLabel
    : content.advanceLabel;

  return (
    <div
      data-testid="loop-engineering-lab"
      className="not-prose my-8 overflow-hidden rounded-2xl border border-slate-200 bg-[#fbfcf8] text-slate-900 shadow-2xl shadow-slate-900/10 dark:border-slate-800 dark:bg-[#090d10] dark:text-slate-100 dark:shadow-slate-950/20"
    >
      <div className="relative overflow-hidden border-b border-slate-200 px-5 py-5 dark:border-slate-800 sm:px-6">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(8,145,178,0.12),transparent_34%),linear-gradient(rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.04)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.12),transparent_34%),linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)]"
          style={{ backgroundSize: "auto, 24px 24px, 24px 24px" }}
        />
        <div className="relative">
          <div className="mb-3 flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-700 dark:text-cyan-300">
            <CircleDot className="h-3.5 w-3.5 animate-pulse" aria-hidden="true" />
            {content.eyebrow}
          </div>
          <h3 className="m-0 text-xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-2xl">
            {content.title}
          </h3>
          <p className="mb-0 mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
            {content.description}
          </p>
        </div>
      </div>

      <div className="space-y-5 p-4 sm:p-6">
        <fieldset>
          <legend className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-500">
            {content.chooseScenarioLabel}
          </legend>
          <div className="grid gap-2 sm:grid-cols-3">
            {content.scenarios.map((item, index) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={scenarioIndex === index}
                onClick={() => reset(index)}
                className={cn(
                  "rounded-lg border px-3 py-2.5 text-left text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300",
                  scenarioIndex === index
                    ? "border-cyan-600/40 bg-cyan-50 text-cyan-950 dark:border-cyan-400/60 dark:bg-cyan-400/10 dark:text-cyan-100"
                    : "border-slate-200 bg-white/80 text-slate-600 hover:border-slate-400 hover:text-slate-950 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400 dark:hover:border-slate-700 dark:hover:text-slate-200"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 dark:border-slate-800 dark:bg-slate-800 lg:grid-cols-3">
          {[
            [content.goalLabel, scenario.goal],
            [content.stopRuleLabel, scenario.stopRule],
            [content.evidenceLabel, scenario.evidence],
          ].map(([label, value]) => (
            <div key={label} className="bg-white/90 p-4 dark:bg-slate-950/90">
              <p className="m-0 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
              <p className="mb-0 mt-2 text-xs leading-5 text-slate-700 dark:text-slate-300">{value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-5">
          {content.stages.map((item, index) => {
            const isActive = !isComplete && index === stageIndex;
            const isPast = isComplete || index < stageIndex;

            return (
              <div key={item.id} className="relative">
                <div
                  className={cn(
                    "h-full min-h-20 rounded-xl border p-3 transition-all duration-300",
                    isActive
                      ? cn(stageStyles[item.id], "translate-y-[-2px] shadow-lg shadow-slate-900/10 dark:shadow-black/30")
                      : isPast
                        ? "border-emerald-600/25 bg-emerald-50 text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-500/8 dark:text-emerald-200"
                        : "border-slate-200 bg-white/60 text-slate-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-500"
                  )}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em]">
                      0{index + 1}
                    </span>
                    {isPast && <Check className="h-3.5 w-3.5" aria-hidden="true" />}
                  </div>
                  <p className="m-0 text-sm font-semibold">{item.label}</p>
                  <p className="mb-0 mt-1 text-[11px] leading-4 opacity-70">{item.verb}</p>
                </div>
                {index < content.stages.length - 1 && (
                  <ArrowRight className="absolute -right-2 top-1/2 z-10 hidden h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-600 sm:block" aria-hidden="true" />
                )}
              </div>
            );
          })}
        </div>

        <div className="grid gap-3 lg:grid-cols-[1fr_15rem]">
          <div className="min-h-44 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950" aria-live="polite">
            <div className="mb-3 flex items-center gap-2">
              <span className={cn("h-2 w-2 rounded-full", isComplete ? "bg-emerald-400" : "bg-amber-300 animate-pulse")} />
              <p className="m-0 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                {isComplete ? content.completeLabel : content.currentSignalLabel}
              </p>
            </div>
            <p data-testid="loop-current-signal" className="m-0 text-base font-medium leading-7 text-slate-900 dark:text-slate-100">
              {isComplete ? content.completeDescription : getSignal()}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 dark:border-slate-800 dark:bg-slate-800 lg:grid-cols-1">
            <div className="bg-white p-4 dark:bg-slate-950">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-500">{content.iterationLabel}</span>
                <span className="font-mono text-xs text-cyan-700 dark:text-cyan-200">{cycleIndex + 1}/{scenario.cycles.length}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                <div
                  className="h-full rounded-full bg-cyan-400 transition-all duration-500"
                  style={{ width: `${((cycleIndex + 1) / scenario.cycles.length) * 100}%` }}
                />
              </div>
            </div>
            <div className="bg-white p-4 dark:bg-slate-950">
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-slate-500">
                  <Gauge className="h-3.5 w-3.5" aria-hidden="true" />
                  {content.progressLabel}
                </span>
                <span data-testid="loop-progress" className="font-mono text-emerald-700 dark:text-emerald-300">{isComplete ? 100 : visibleProgress}%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">{content.openIssuesLabel}</span>
                <span className="font-mono text-amber-700 dark:text-amber-200">{isComplete ? 0 : visibleOpenIssues}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-500 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-800 dark:focus-visible:ring-cyan-300"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            {content.resetLabel}
          </button>
          <button
            type="button"
            onClick={advance}
            disabled={isComplete}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:bg-emerald-600 dark:bg-cyan-300 dark:text-slate-950 dark:hover:bg-cyan-200 dark:focus-visible:ring-cyan-100 dark:focus-visible:ring-offset-slate-950 dark:disabled:bg-emerald-300"
          >
            {isComplete ? <Check className="h-4 w-4" aria-hidden="true" /> : null}
            {isComplete ? content.completeLabel : buttonLabel}
            {!isComplete ? <ArrowRight className="h-4 w-4" aria-hidden="true" /> : null}
          </button>
        </div>
      </div>
    </div>
  );
}
