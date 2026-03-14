import { getLastNDaysRange, isWithinRange, startOfWeek } from '@/utils/date';
const sum = (values) => values.reduce((acc, value) => acc + value, 0);
const average = (values) => (values.length ? sum(values) / values.length : 0);
export const filterLogsByRange = (logs, range) => {
    if (range.preset === 'all')
        return logs;
    if (range.preset === '7d') {
        const { start, end } = getLastNDaysRange(7);
        return logs.filter((log) => isWithinRange(log.sessionDate, start, end));
    }
    if (range.preset === '30d') {
        const { start, end } = getLastNDaysRange(30);
        return logs.filter((log) => isWithinRange(log.sessionDate, start, end));
    }
    return logs.filter((log) => isWithinRange(log.sessionDate, range.start, range.end));
};
const byWeek = (logs) => {
    const bucket = new Map();
    logs.forEach((log) => {
        const key = startOfWeek(new Date(`${log.sessionDate}T00:00:00`)).toISOString().slice(0, 10);
        bucket.set(key, [...(bucket.get(key) ?? []), log]);
    });
    return [...bucket.entries()].sort(([a], [b]) => a.localeCompare(b));
};
export const calculateWeeklyStreaks = (logs, weeklyGoal) => {
    const weeks = byWeek(logs);
    let currentStreak = 0;
    let bestStreak = 0;
    for (const [, weekLogs] of weeks) {
        if (weekLogs.length >= weeklyGoal) {
            bestStreak += 1;
        }
        else {
            bestStreak = 0;
        }
    }
    let runningBest = 0;
    let longest = 0;
    for (const [, weekLogs] of weeks) {
        runningBest = weekLogs.length >= weeklyGoal ? runningBest + 1 : 0;
        longest = Math.max(longest, runningBest);
    }
    const reversed = [...weeks].reverse();
    for (const [, weekLogs] of reversed) {
        if (weekLogs.length >= weeklyGoal)
            currentStreak += 1;
        else
            break;
    }
    return { currentStreak, bestStreak: Math.max(longest, bestStreak) };
};
const makeTrend = (logs, mapper) => byWeek(logs).map(([, items]) => mapper(items));
export const calculateAnalytics = (allLogs, settings, range) => {
    const logs = filterLogsByRange(allLogs, range);
    const sessions = logs.length;
    const totalMatHours = sum(logs.map((log) => log.durationMinutes)) / 60;
    const totalRolls = sum(logs.map((log) => log.totalRolls));
    const totalRounds = sum(logs.map((log) => log.totalRounds));
    const hoursRolling = sum(logs.map((log) => log.totalRolls * log.roundLengthMinutes)) / 60;
    const hoursResting = sum(logs.map((log) => Math.max(0, log.totalRolls - 1) * log.restLengthMinutes)) / 60;
    const giCount = logs.filter((log) => log.gi).length;
    const noGiCount = sessions - giCount;
    const totalSubmissions = sum(logs.map((log) => log.submissions));
    const totalTaps = sum(logs.map((log) => log.taps));
    const thisWeekStart = startOfWeek(new Date()).toISOString().slice(0, 10);
    const weeklyLogs = allLogs.filter((log) => log.sessionDate >= thisWeekStart);
    const annualTarget = settings.annualTarget || settings.weeklyGoal * 52;
    const { currentStreak, bestStreak } = calculateWeeklyStreaks(allLogs, settings.weeklyGoal);
    return {
        summary: {
            sessions,
            totalMatHours,
            rollingPercent: totalMatHours === 0 ? 0 : (hoursRolling / totalMatHours) * 100,
            submissions: totalSubmissions,
            taps: totalTaps,
            subTapRatio: totalTaps === 0 ? totalSubmissions : totalSubmissions / totalTaps,
            giCount,
            noGiCount,
        },
        totalRounds,
        totalRolls,
        hoursRolling,
        hoursResting,
        rollsPerSession: sessions === 0 ? 0 : totalRolls / sessions,
        averageCardio: average(logs.map((log) => log.cardioRating)),
        averageIntensity: average(logs.map((log) => log.intensityRating)),
        techniquesLearnedCount: sum(logs.map((log) => log.techniquesLearned.length)),
        injuryCount: sum(logs.map((log) => log.injuries.length)),
        sweeps: sum(logs.map((log) => log.sweeps)),
        escapes: sum(logs.map((log) => log.escapes)),
        passes: sum(logs.map((log) => log.guardPasses)),
        takedowns: sum(logs.map((log) => log.takedowns)),
        weeklyGoalProgress: settings.weeklyGoal === 0 ? 0 : (weeklyLogs.length / settings.weeklyGoal) * 100,
        annualProgress: annualTarget === 0 ? 0 : (allLogs.length / annualTarget) * 100,
        currentStreak,
        bestStreak,
        sessionsPerWeek: makeTrend(logs, (items) => ({
            label: startOfWeek(new Date(`${items[0].sessionDate}T00:00:00`)).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
            }),
            value: items.length,
        })),
        rollingTimeTrend: makeTrend(logs, (items) => ({
            label: startOfWeek(new Date(`${items[0].sessionDate}T00:00:00`)).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
            }),
            value: sum(items.map((item) => item.totalRolls * item.roundLengthMinutes)) / 60,
        })),
        submissionsVsTaps: makeTrend(logs, (items) => ({
            label: startOfWeek(new Date(`${items[0].sessionDate}T00:00:00`)).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
            }),
            value: sum(items.map((item) => item.submissions)),
            secondaryValue: sum(items.map((item) => item.taps)),
        })),
        giDistribution: [
            { label: 'Gi', value: giCount },
            { label: 'No-Gi', value: noGiCount },
        ],
    };
};
