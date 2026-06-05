export let classMultipleScoreDistBySubject: Record<string, { range: string, '期中考试': number, '上学期期末': number, '上学期期中': number }[]> = {
  '总分': [
    { range: '<400', '期中考试': 0, '上学期期末': 1, '上学期期中': 0 },
    { range: '400-450', '期中考试': 2, '上学期期末': 3, '上学期期中': 1 },
    { range: '450-500', '期中考试': 12, '上学期期末': 15, '上学期期中': 10 },
    { range: '500-550', '期中考试': 35, '上学期期末': 30, '上学期期中': 38 },
    { range: '550-600', '期中考试': 22, '上学期期末': 20, '上学期期中': 22 },
    { range: '600-650', '期中考试': 8, '上学期期末': 10, '上学期期中': 7 },
    { range: '>=650', '期中考试': 1, '上学期期末': 1, '上学期期中': 2 },
  ],
  '语文': [
    { range: '<90', '期中考试': 2, '上学期期末': 3, '上学期期中': 1 },
    { range: '90-100', '期中考试': 15, '上学期期末': 12, '上学期期中': 18 },
    { range: '100-110', '期中考试': 32, '上学期期末': 30, '上学期期中': 28 },
    { range: '110-120', '期中考试': 21, '上学期期末': 25, '上学期期中': 22 },
    { range: '>=120', '期中考试': 10, '上学期期末': 10, '上学期期中': 11 },
  ],
  '数学': [
    { range: '<60', '期中考试': 8, '上学期期末': 5, '上学期期中': 10 },
    { range: '60-80', '期中考试': 15, '上学期期末': 18, '上学期期中': 12 },
    { range: '80-100', '期中考试': 25, '上学期期末': 22, '上学期期中': 28 },
    { range: '100-120', '期中考试': 20, '上学期期末': 25, '上学期期中': 20 },
    { range: '>=120', '期中考试': 12, '上学期期末': 10, '上学期期中': 10 },
  ],
  '英语': [
    { range: '<60', '期中考试': 5, '上学期期末': 8, '上学期期中': 6 },
    { range: '60-80', '期中考试': 12, '上学期期末': 15, '上学期期中': 10 },
    { range: '80-100', '期中考试': 30, '上学期期末': 25, '上学期期中': 28 },
    { range: '100-120', '期中考试': 25, '上学期期末': 22, '上学期期中': 26 },
    { range: '>=120', '期中考试': 8, '上学期期末': 10, '上学期期中': 10 },
  ],
  '物理': [
    { range: '<40', '期中考试': 10, '上学期期末': 12, '上学期期中': 8 },
    { range: '40-60', '期中考试': 25, '上学期期末': 22, '上学期期中': 28 },
    { range: '60-80', '期中考试': 30, '上学期期末': 28, '上学期期中': 25 },
    { range: '80-90', '期中考试': 10, '上学期期末': 12, '上学期期中': 14 },
    { range: '>=90', '期中考试': 5, '上学期期末': 6, '上学期期中': 5 },
  ],
  '化学': [
    { range: '<40', '期中考试': 8, '上学期期末': 10, '上学期期中': 6 },
    { range: '40-60', '期中考试': 22, '上学期期末': 25, '上学期期中': 20 },
    { range: '60-80', '期中考试': 35, '上学期期末': 30, '上学期期中': 38 },
    { range: '80-90', '期中考试': 12, '上学期期末': 10, '上学期期中': 12 },
    { range: '>=90', '期中考试': 3, '上学期期末': 5, '上学期期中': 4 },
  ],
  '生物': [
    { range: '<40', '期中考试': 5, '上学期期末': 8, '上学期期中': 4 },
    { range: '40-60', '期中考试': 15, '上学期期末': 20, '上学期期中': 12 },
    { range: '60-80', '期中考试': 40, '上学期期末': 35, '上学期期中': 45 },
    { range: '80-90', '期中考试': 15, '上学期期末': 12, '上学期期中': 18 },
    { range: '>=90', '期中考试': 5, '上学期期末': 5, '上学期期中': 1 },
  ],
  '历史': [
    { range: '<40', '期中考试': 4, '上学期期末': 5, '上学期期中': 3 },
    { range: '40-60', '期中考试': 18, '上学期期末': 20, '上学期期中': 15 },
    { range: '60-80', '期中考试': 38, '上学期期末': 35, '上学期期中': 40 },
    { range: '80-90', '期中考试': 14, '上学期期末': 15, '上学期期中': 18 },
    { range: '>=90', '期中考试': 6, '上学期期末': 5, '上学期期中': 4 },
  ],
  '地理': [
    { range: '<40', '期中考试': 6, '上学期期末': 8, '上学期期中': 5 },
    { range: '40-60', '期中考试': 20, '上学期期末': 22, '上学期期中': 18 },
    { range: '60-80', '期中考试': 36, '上学期期末': 32, '上学期期中': 40 },
    { range: '80-90', '期中考试': 12, '上学期期末': 15, '上学期期中': 14 },
    { range: '>=90', '期中考试': 6, '上学期期末': 3, '上学期期中': 3 },
  ],
  '政治': [
    { range: '<40', '期中考试': 3, '上学期期末': 5, '上学期期中': 2 },
    { range: '40-60', '期中考试': 14, '上学期期末': 18, '上学期期中': 10 },
    { range: '60-80', '期中考试': 45, '上学期期末': 40, '上学期期中': 50 },
    { range: '80-90', '期中考试': 15, '上学期期末': 12, '上学期期中': 16 },
    { range: '>=90', '期中考试': 3, '上学期期末': 5, '上学期期中': 2 },
  ],
};

export let classMultipleLevelDistBySubject: Record<string, { exam: string, excellent: number, good: number, pass: number, low: number }[]> = {
  '总分': [
    { exam: '上学期期中', excellent: 12, good: 28, pass: 25, low: 15 },
    { exam: '上学期期末', excellent: 15, good: 25, pass: 28, low: 12 },
    { exam: '期中考试', excellent: 14, good: 26, pass: 26, low: 14 },
  ],
  '语文': [
    { exam: '上学期期中', excellent: 4, good: 28, pass: 38, low: 10 },
    { exam: '上学期期末', excellent: 6, good: 25, pass: 34, low: 15 },
    { exam: '期中考试', excellent: 5, good: 30, pass: 35, low: 10 },
  ],
  '数学': [
    { exam: '上学期期中', excellent: 10, good: 18, pass: 32, low: 20 },
    { exam: '上学期期末', excellent: 14, good: 22, pass: 28, low: 16 },
    { exam: '期中考试', excellent: 12, good: 20, pass: 30, low: 18 },
  ],
  '英语': [
    { exam: '上学期期中', excellent: 6, good: 22, pass: 38, low: 14 },
    { exam: '上学期期末', excellent: 10, good: 28, pass: 30, low: 12 },
    { exam: '期中考试', excellent: 8, good: 25, pass: 35, low: 12 },
  ],
  '物理': [
    { exam: '上学期期中', excellent: 4, good: 12, pass: 32, low: 32 },
    { exam: '上学期期末', excellent: 6, good: 16, pass: 28, low: 30 },
    { exam: '期中考试', excellent: 5, good: 15, pass: 30, low: 30 },
  ],
  '化学': [
    { exam: '上学期期中', excellent: 5, good: 16, pass: 34, low: 25 },
    { exam: '上学期期末', excellent: 8, good: 20, pass: 30, low: 22 },
    { exam: '期中考试', excellent: 6, good: 18, pass: 32, low: 24 },
  ],
  '生物': [
    { exam: '上学期期中', excellent: 6, good: 18, pass: 38, low: 18 },
    { exam: '上学期期末', excellent: 10, good: 22, pass: 32, low: 16 },
    { exam: '期中考试', excellent: 8, good: 20, pass: 35, low: 17 },
  ],
  '历史': [
    { exam: '上学期期中', excellent: 4, good: 12, pass: 40, low: 24 },
    { exam: '上学期期末', excellent: 8, good: 16, pass: 36, low: 20 },
    { exam: '期中考试', excellent: 6, good: 14, pass: 38, low: 22 },
  ],
  '地理': [
    { exam: '上学期期中', excellent: 5, good: 14, pass: 38, low: 23 },
    { exam: '上学期期末', excellent: 7, good: 18, pass: 34, low: 21 },
    { exam: '期中考试', excellent: 6, good: 16, pass: 36, low: 22 },
  ],
  '政治': [
    { exam: '上学期期中', excellent: 2, good: 14, pass: 46, low: 18 },
    { exam: '上学期期末', excellent: 5, good: 18, pass: 42, low: 15 },
    { exam: '期中考试', excellent: 3, good: 15, pass: 45, low: 17 },
  ],
};

export let kpiData = {
  yearSingle: { avg: 562.4, pass: 82.5, excellent: 28.3, low: 4.1 },
  classSingle: { avg: 581.2, pass: 88.0, excellent: 35.6, low: 1.2 },
  subjectSingle: { avg: 112.5, pass: 78.4, excellent: 22.1, low: 8.5 }
};

export let yearTrendDataNew = [
  { exam: '第一次月考', avg: 540, passRate: 75, excRate: 20 },
  { exam: '期中考试', avg: 552, passRate: 78, excRate: 22 },
  { exam: '第二次月考', avg: 548, passRate: 76, excRate: 21 },
  { exam: '联考', avg: 560, passRate: 80, excRate: 25 },
  { exam: '期末考试', avg: 562, passRate: 82, excRate: 28 },
];

export let boxPlotData = [
  { exam: '第一次月考', min: 310, q1: 450, median: 540, q3: 620, max: 710, box: [450, 620] },
  { exam: '期中考试', min: 325, q1: 460, median: 552, q3: 630, max: 725, box: [460, 630] },
  { exam: '第二次月考', min: 315, q1: 455, median: 548, q3: 625, max: 715, box: [455, 625] },
  { exam: '联考', min: 340, q1: 470, median: 560, q3: 640, max: 735, box: [470, 640] },
  { exam: '期末考试', min: 350, q1: 480, median: 562, q3: 650, max: 742, box: [480, 650] },
];

export let yearRankData = [
  { rank: 1, name: '李思远', class: '高三1班', score: 742, math: 148, eng: 145 },
  { rank: 2, name: '王芳', class: '高三2班', score: 738, math: 145, eng: 142 },
  { rank: 3, name: '李娜', class: '高三1班', score: 735, math: 142, eng: 148 },
  { rank: 4, name: '刘洋', class: '高三3班', score: 730, math: 140, eng: 140 },
  { rank: 5, name: '陈杰', class: '高三1班', score: 728, math: 146, eng: 135 },
  { rank: 6, name: '赵磊', class: '高三5班', score: 725, math: 138, eng: 138 },
  { rank: 7, name: '黄勇', class: '高三2班', score: 722, math: 141, eng: 136 },
  { rank: 8, name: '周琴', class: '高三4班', score: 720, math: 135, eng: 145 },
  { rank: 9, name: '吴强', class: '高三1班', score: 718, math: 139, eng: 140 },
  { rank: 10, name: '徐娟', class: '高三6班', score: 715, math: 144, eng: 132 },
];

export let classSingleScoreDist = [
  { range: '0-49', count: 1 },
  { range: '50-59', count: 6 },
  { range: '60-69', count: 16 },
  { range: '70-79', count: 27 },
  { range: '80-89', count: 18 },
  { range: '90-100', count: 12 },
];

export let classSingleScoreDistBySubject: Record<string, { range: string, count: number }[]> = {
  '总分': [
    { range: '<400', count: 0 },
    { range: '400-450', count: 2 },
    { range: '450-500', count: 12 },
    { range: '500-550', count: 35 },
    { range: '550-600', count: 22 },
    { range: '600-650', count: 8 },
    { range: '>=650', count: 1 },
  ],
  '语文': [
    { range: '<90', count: 2 },
    { range: '90-100', count: 15 },
    { range: '100-110', count: 32 },
    { range: '110-120', count: 21 },
    { range: '>=120', count: 10 },
  ],
  '数学': [
    { range: '<60', count: 8 },
    { range: '60-80', count: 15 },
    { range: '80-100', count: 25 },
    { range: '100-120', count: 20 },
    { range: '>=120', count: 12 },
  ],
  '英语': [
    { range: '<60', count: 5 },
    { range: '60-80', count: 12 },
    { range: '80-100', count: 30 },
    { range: '100-120', count: 25 },
    { range: '>=120', count: 8 },
  ],
  '物理': [
    { range: '<40', count: 10 },
    { range: '40-60', count: 25 },
    { range: '60-80', count: 30 },
    { range: '80-90', count: 10 },
    { range: '>=90', count: 5 },
  ],
  '化学': [
    { range: '<40', count: 8 },
    { range: '40-60', count: 22 },
    { range: '60-80', count: 35 },
    { range: '80-90', count: 12 },
    { range: '>=90', count: 3 },
  ],
  '生物': [
    { range: '<40', count: 5 },
    { range: '40-60', count: 15 },
    { range: '60-80', count: 40 },
    { range: '80-90', count: 15 },
    { range: '>=90', count: 5 },
  ],
  '历史': [
    { range: '<40', count: 4 },
    { range: '40-60', count: 18 },
    { range: '60-80', count: 38 },
    { range: '80-90', count: 14 },
    { range: '>=90', count: 6 },
  ],
  '地理': [
    { range: '<40', count: 6 },
    { range: '40-60', count: 20 },
    { range: '60-80', count: 36 },
    { range: '80-90', count: 12 },
    { range: '>=90', count: 6 },
  ],
  '政治': [
    { range: '<40', count: 3 },
    { range: '40-60', count: 14 },
    { range: '60-80', count: 45 },
    { range: '80-90', count: 15 },
    { range: '>=90', count: 3 },
  ],
};

export let classSingleLevelDistBySubject: Record<string, { name: string, value: number, color: string }[]> = {
  '总分': [
    { name: '优秀 (90%及以上)', value: 14, color: '#3b82f6' },
    { name: '良好 (75%~89%)', value: 26, color: '#10b981' },
    { name: '中等 (60%~74%)', value: 26, color: '#f59e0b' },
    { name: '待提升 (60%以下)', value: 14, color: '#ef4444' },
  ],
  '语文': [
    { name: '优秀 (135分及以上)', value: 5, color: '#3b82f6' },
    { name: '良好 (115~134分)', value: 30, color: '#10b981' },
    { name: '中等 (90~114分)', value: 35, color: '#f59e0b' },
    { name: '待提升 (90分以下)', value: 10, color: '#ef4444' },
  ],
  '数学': [
    { name: '优秀 (135分及以上)', value: 12, color: '#3b82f6' },
    { name: '良好 (115~134分)', value: 20, color: '#10b981' },
    { name: '中等 (90~114分)', value: 30, color: '#f59e0b' },
    { name: '待提升 (90分以下)', value: 18, color: '#ef4444' },
  ],
  '英语': [
    { name: '优秀 (135分及以上)', value: 8, color: '#3b82f6' },
    { name: '良好 (115~134分)', value: 25, color: '#10b981' },
    { name: '中等 (90~114分)', value: 35, color: '#f59e0b' },
    { name: '待提升 (90分以下)', value: 12, color: '#ef4444' },
  ],
  '物理': [
    { name: '优秀 (90分及以上)', value: 5, color: '#3b82f6' },
    { name: '良好 (75~89分)', value: 15, color: '#10b981' },
    { name: '中等 (60~74分)', value: 30, color: '#f59e0b' },
    { name: '待提升 (60分以下)', value: 30, color: '#ef4444' },
  ],
  '化学': [
    { name: '优秀 (90分及以上)', value: 6, color: '#3b82f6' },
    { name: '良好 (75~89分)', value: 18, color: '#10b981' },
    { name: '中等 (60~74分)', value: 32, color: '#f59e0b' },
    { name: '待提升 (60分以下)', value: 24, color: '#ef4444' },
  ],
  '生物': [
    { name: '优秀 (90分及以上)', value: 8, color: '#3b82f6' },
    { name: '良好 (75~89分)', value: 20, color: '#10b981' },
    { name: '中等 (60~74分)', value: 35, color: '#f59e0b' },
    { name: '待提升 (60分以下)', value: 17, color: '#ef4444' },
  ],
  '历史': [
    { name: '优秀 (90分及以上)', value: 6, color: '#3b82f6' },
    { name: '良好 (75~89分)', value: 14, color: '#10b981' },
    { name: '中等 (60~74分)', value: 38, color: '#f59e0b' },
    { name: '待提升 (60分以下)', value: 22, color: '#ef4444' },
  ],
  '地理': [
    { name: '优秀 (90分及以上)', value: 6, color: '#3b82f6' },
    { name: '良好 (75~89分)', value: 16, color: '#10b981' },
    { name: '中等 (60~74分)', value: 36, color: '#f59e0b' },
    { name: '待提升 (60分以下)', value: 22, color: '#ef4444' },
  ],
  '政治': [
    { name: '优秀 (90分及以上)', value: 3, color: '#3b82f6' },
    { name: '良好 (75~89分)', value: 15, color: '#10b981' },
    { name: '中等 (60~74分)', value: 45, color: '#f59e0b' },
    { name: '待提升 (60分以下)', value: 17, color: '#ef4444' },
  ],
};

export let classSingleLevelDist = [
  { name: '优秀 (90分及以上)', value: 14, color: '#3b82f6' },
  { name: '良好 (75~89分)', value: 26, color: '#10b981' },
  { name: '中等 (60~74分)', value: 26, color: '#f59e0b' },
  { name: '待提升 (60分以下)', value: 14, color: '#ef4444' },
];

export let classSingleSubjectAverages = [
  { subject: '语文', score: 108.6 },
  { subject: '数学', score: 99.3 },
  { subject: '英语', score: 97.1 },
  { subject: '物理', score: 68.4 },
  { subject: '化学', score: 71.2 },
  { subject: '生物', score: 64.8 },
  { subject: '历史', score: 66.7 },
  { subject: '地理', score: 65.1 },
  { subject: '政治', score: 62.3 },
];

export let classSingleSubjectRates: Record<string, { excellent: number, good: number, pass: number, low: number }> = {
  '全科': { excellent: 17.5, good: 32.5, pass: 36.8, low: 13.2 },
  '语文': { excellent: 12.0, good: 40.0, pass: 43.0, low: 5.0 },
  '数学': { excellent: 25.0, good: 20.0, pass: 35.0, low: 20.0 },
  '英语': { excellent: 18.0, good: 28.0, pass: 39.0, low: 15.0 },
  '物理': { excellent: 15.0, good: 25.0, pass: 35.0, low: 25.0 },
  '化学': { excellent: 20.0, good: 30.0, pass: 32.0, low: 18.0 },
  '生物': { excellent: 16.0, good: 35.0, pass: 39.0, low: 10.0 },
  '历史': { excellent: 15.0, good: 30.0, pass: 40.0, low: 15.0 },
  '地理': { excellent: 14.0, good: 32.0, pass: 42.0, low: 12.0 },
  '政治': { excellent: 10.0, good: 35.0, pass: 47.0, low: 8.0 },
};

export let classScoreDistData = [
  { range: '<400', count: 0 },
  { range: '400-450', count: 2 },
  { range: '450-500', count: 5 },
  { range: '500-550', count: 12 },
  { range: '550-600', count: 18 },
  { range: '600-650', count: 10 },
  { range: '>650', count: 3 },
];

export let classSingleStudentData = [
  { id: '2401', name: '李明轩', total: 680, '语文': 120, '数学': 140, '英语': 135, '物理': 95, '化学': 95, '生物': 95, rank: 1, trend: 'up' },
  { id: '2402', name: '张子涵', total: 665, '语文': 115, '数学': 135, '英语': 130, '物理': 90, '化学': 95, '生物': 100, rank: 2, trend: 'same' },
  { id: '2403', name: '王思睿', total: 652, '语文': 118, '数学': 130, '英语': 138, '物理': 92, '化学': 84, '生物': 90, rank: 3, trend: 'up' },
  { id: '2404', name: '陈雨桐', total: 640, '语文': 110, '数学': 125, '英语': 125, '物理': 90, '化学': 95, '生物': 95, rank: 4, trend: 'down' },
  { id: '2405', name: '刘宇航', total: 620, '语文': 105, '数学': 130, '英语': 120, '物理': 85, '化学': 90, '生物': 90, rank: 5, trend: 'up' },
  { id: '2406', name: '赵欣怡', total: 618, '语文': 112, '数学': 120, '英语': 130, '物理': 88, '化学': 86, '生物': 82, rank: 6, trend: 'down' },
  { id: '2407', name: '林浩然', total: 615, '语文': 110, '数学': 125, '英语': 128, '物理': 85, '化学': 82, '生物': 85, rank: 7, trend: 'up' },
  { id: '2408', name: '周梦瑶', total: 610, '语文': 118, '数学': 115, '英语': 132, '物理': 80, '化学': 85, '生物': 80, rank: 8, trend: 'same' },
  { id: '2409', name: '吴思语', total: 605, '语文': 108, '数学': 122, '英语': 126, '物理': 84, '化学': 80, '生物': 85, rank: 9, trend: 'down' },
  { id: '2410', name: '郑博文', total: 598, '语文': 105, '数学': 135, '英语': 115, '物理': 82, '化学': 78, '生物': 83, rank: 10, trend: 'up' },
  { id: '2411', name: '黄心怡', total: 595, '语文': 115, '数学': 110, '英语': 125, '物理': 78, '化学': 82, '生物': 85, rank: 11, trend: 'down' },
  { id: '2412', name: '孙家乐', total: 590, '语文': 102, '数学': 128, '英语': 118, '物理': 85, '化学': 75, '生物': 82, rank: 12, trend: 'same' },
  { id: '2413', name: '曾子豪', total: 585, '语文': 100, '数学': 130, '英语': 112, '物理': 88, '化学': 75, '生物': 80, rank: 13, trend: 'up' },
  { id: '2414', name: '邓雅琪', total: 580, '语文': 120, '数学': 100, '英语': 135, '物理': 70, '化学': 75, '生物': 80, rank: 14, trend: 'down' },
  { id: '2415', name: '曹宇轩', total: 575, '语文': 105, '数学': 115, '英语': 120, '物理': 75, '化学': 80, '生物': 80, rank: 15, trend: 'same' },
];

export let classStudentData = [
  { id: '2401', name: '李明轩', score: 680, rank: 1, trend: 'up' },
  { id: '2402', name: '张子涵', score: 665, rank: 2, trend: 'same' },
  { id: '2403', name: '王思睿', score: 652, rank: 3, trend: 'up' },
  { id: '2404', name: '陈雨桐', score: 640, rank: 4, trend: 'down' },
  { id: '2405', name: '刘宇航', score: 620, rank: 5, trend: 'up' },
  { id: '2406', name: '赵欣怡', score: 618, rank: 6, trend: 'down' },
];

export let classProgressStackDataBySubject: Record<string, { exam: string, progress: number, regress: number, stable: number }[]> = {
  '总分': [
    { exam: '第一次月考', progress: 12, regress: 10, stable: 28 },
    { exam: '期中考试', progress: 15, regress: 8, stable: 27 },
    { exam: '第二次月考', progress: 8, regress: 15, stable: 27 },
    { exam: '联考', progress: 20, regress: 5, stable: 25 },
    { exam: '期末考试', progress: 18, regress: 6, stable: 26 },
  ],
  '语文': [
    { exam: '第一次月考', progress: 10, regress: 12, stable: 28 },
    { exam: '期中考试', progress: 20, regress: 5, stable: 25 },
    { exam: '第二次月考', progress: 15, regress: 10, stable: 25 },
    { exam: '联考', progress: 18, regress: 8, stable: 24 },
    { exam: '期末考试', progress: 22, regress: 5, stable: 23 },
  ],
  '数学': [
    { exam: '第一次月考', progress: 15, regress: 15, stable: 20 },
    { exam: '期中考试', progress: 25, regress: 10, stable: 15 },
    { exam: '第二次月考', progress: 12, regress: 18, stable: 20 },
    { exam: '联考', progress: 22, regress: 8, stable: 20 },
    { exam: '期末考试', progress: 28, regress: 5, stable: 17 },
  ],
  '英语': [
    { exam: '第一次月考', progress: 8, regress: 8, stable: 34 },
    { exam: '期中考试', progress: 12, regress: 10, stable: 28 },
    { exam: '第二次月考', progress: 10, regress: 12, stable: 28 },
    { exam: '联考', progress: 15, regress: 5, stable: 30 },
    { exam: '期末考试', progress: 20, regress: 5, stable: 25 },
  ],
  '物理': [
    { exam: '第一次月考', progress: 18, regress: 12, stable: 20 },
    { exam: '期中考试', progress: 15, regress: 20, stable: 15 },
    { exam: '第二次月考', progress: 20, regress: 10, stable: 20 },
    { exam: '联考', progress: 25, regress: 5, stable: 20 },
    { exam: '期末考试', progress: 22, regress: 8, stable: 20 },
  ],
  '化学': [
    { exam: '第一次月考', progress: 12, regress: 15, stable: 23 },
    { exam: '期中考试', progress: 18, regress: 10, stable: 22 },
    { exam: '第二次月考', progress: 15, regress: 12, stable: 23 },
    { exam: '联考', progress: 20, regress: 8, stable: 22 },
    { exam: '期末考试', progress: 25, regress: 5, stable: 20 },
  ],
  '生物': [
    { exam: '第一次月考', progress: 10, regress: 10, stable: 30 },
    { exam: '期中考试', progress: 15, regress: 8, stable: 27 },
    { exam: '第二次月考', progress: 12, regress: 15, stable: 23 },
    { exam: '联考', progress: 18, regress: 6, stable: 26 },
    { exam: '期末考试', progress: 22, regress: 5, stable: 23 },
  ],
  '历史': [
    { exam: '第一次月考', progress: 8, regress: 12, stable: 30 },
    { exam: '期中考试', progress: 10, regress: 8, stable: 32 },
    { exam: '第二次月考', progress: 15, regress: 10, stable: 25 },
    { exam: '联考', progress: 20, regress: 5, stable: 25 },
    { exam: '期末考试', progress: 18, regress: 6, stable: 26 },
  ],
  '地理': [
    { exam: '第一次月考', progress: 12, regress: 10, stable: 28 },
    { exam: '期中考试', progress: 15, regress: 8, stable: 27 },
    { exam: '第二次月考', progress: 10, regress: 12, stable: 28 },
    { exam: '联考', progress: 18, regress: 6, stable: 26 },
    { exam: '期末考试', progress: 20, regress: 5, stable: 25 },
  ],
  '政治': [
    { exam: '第一次月考', progress: 10, regress: 8, stable: 32 },
    { exam: '期中考试', progress: 12, regress: 10, stable: 28 },
    { exam: '第二次月考', progress: 15, regress: 8, stable: 27 },
    { exam: '联考', progress: 20, regress: 5, stable: 25 },
    { exam: '期末考试', progress: 25, regress: 4, stable: 21 },
  ],
};

export let classMultipleStudentsData = [
  { 
    id: '1', 
    name: '李明浩', 
    scores: [
      { exam: '上学期期中', total: 620, '语文': 110, '数学': 130, '英语': 125, '物理': 85, '化学': 80, '生物': 90 },
      { exam: '上学期期末', total: 635, '语文': 112, '数学': 135, '英语': 128, '物理': 88, '化学': 82, '生物': 90 },
      { exam: '期中考试',   total: 650, '语文': 115, '数学': 140, '英语': 130, '物理': 90, '化学': 85, '生物': 90 },
    ]
  },
  { 
    id: '2', 
    name: '张梓涵', 
    scores: [
      { exam: '上学期期中', total: 580, '语文': 105, '数学': 110, '英语': 115, '物理': 75, '化学': 85, '生物': 90 },
      { exam: '上学期期末', total: 590, '语文': 108, '数学': 115, '英语': 118, '物理': 78, '化学': 82, '生物': 89 },
      { exam: '期中考试',   total: 585, '语文': 106, '数学': 120, '英语': 110, '物理': 70, '化学': 88, '生物': 91 },
    ]
  },
  {
    id: '3',
    name: '王宇轩',
    scores: [
      { exam: '上学期期中', total: 600, '语文': 110, '数学': 120, '英语': 120, '物理': 80, '化学': 80, '生物': 90 },
      { exam: '上学期期末', total: 580, '语文': 105, '数学': 110, '英语': 115, '物理': 75, '化学': 85, '生物': 90 },
      { exam: '期中考试',   total: 590, '语文': 108, '数学': 115, '英语': 118, '物理': 78, '化学': 82, '生物': 89 },
    ]
  },
  {
    id: '4',
    name: '陈雨桐',
    scores: [
      { exam: '上学期期中', total: 550, '语文': 90, '数学': 100, '英语': 110, '物理': 70, '化学': 80, '生物': 100 },
      { exam: '上学期期末', total: 590, '语文': 95, '数学': 120, '英语': 115, '物理': 80, '化学': 85, '生物': 95 },
      { exam: '期中考试',   total: 620, '语文': 105, '数学': 130, '英语': 125, '物理': 85, '化学': 85, '生物': 90 },
    ]
  },
  {
    id: '5',
    name: '刘洋',
    scores: [
      { exam: '上学期期中', total: 500, '语文': 95, '数学': 90, '英语': 100, '物理': 65, '化学': 70, '生物': 80 },
      { exam: '上学期期末', total: 480, '语文': 100, '数学': 80, '英语': 95, '物理': 60, '化学': 65, '生物': 80 },
      { exam: '期中考试',   total: 510, '语文': 105, '数学': 95, '英语': 105, '物理': 65, '化学': 60, '生物': 80 },
    ]
  },
  {
    id: '6',
    name: '何家浩',
    scores: [
      { exam: '上学期期中', total: 600, '语文': 105, '数学': 125, '英语': 120, '物理': 82, '化学': 85, '生物': 83 },
      { exam: '上学期期末', total: 610, '语文': 108, '数学': 128, '英语': 122, '物理': 84, '化学': 84, '生物': 84 },
      { exam: '期中考试',   total: 630, '语文': 112, '数学': 132, '英语': 128, '物理': 86, '化学': 86, '生物': 86 },
    ]
  },
  {
    id: '7',
    name: '张宇翔',
    scores: [
      { exam: '上学期期中', total: 590, '语文': 102, '数学': 122, '英语': 118, '物理': 80, '化学': 85, '生物': 83 },
      { exam: '上学期期末', total: 605, '语文': 105, '数学': 128, '英语': 120, '物理': 85, '化学': 85, '生物': 82 },
      { exam: '期中考试',   total: 625, '语文': 110, '数学': 135, '英语': 125, '物理': 88, '化学': 83, '生物': 84 },
    ]
  },
  {
    id: '8',
    name: '夏静雅',
    scores: [
      { exam: '上学期期中', total: 615, '语文': 115, '数学': 120, '英语': 135, '物理': 75, '化学': 85, '生物': 85 },
      { exam: '上学期期末', total: 620, '语文': 118, '数学': 122, '英语': 138, '物理': 78, '化学': 80, '生物': 84 },
      { exam: '期中考试',   total: 635, '语文': 120, '数学': 128, '英语': 140, '物理': 80, '化学': 82, '生物': 85 },
    ]
  },
  {
    id: '9',
    name: '周亦然',
    scores: [
      { exam: '上学期期中', total: 570, '语文': 98, '数学': 115, '英语': 110, '物理': 78, '化学': 85, '生物': 84 },
      { exam: '上学期期末', total: 585, '语文': 102, '数学': 122, '英语': 115, '物理': 80, '化学': 82, '生物': 84 },
      { exam: '期中考试',   total: 608, '语文': 105, '数学': 128, '英语': 122, '物理': 84, '化学': 85, '生物': 84 },
    ]
  }
];

export let classProgressStackData = [
  { exam: '第一次月考', progress: 12, regress: 10, stable: 28 },
  { exam: '期中考试', progress: 15, regress: 8, stable: 27 },
  { exam: '第二次月考', progress: 8, regress: 15, stable: 27 },
  { exam: '联考', progress: 20, regress: 5, stable: 25 },
  { exam: '期末考试', progress: 18, regress: 6, stable: 26 },
];

export let classTrendDataNew = [
  { exam: '第一次月考', avg: 550, rank: 3 },
  { exam: '期中考试', avg: 565, rank: 2 },
  { exam: '第二次月考', avg: 558, rank: 3 },
  { exam: '联考', avg: 580, rank: 1 },
  { exam: '期末考试', avg: 581, rank: 1 },
];

export let subjectKnowledgeData = [
  { name: '集合与函数', mastery: 85, importance: '高' },
  { name: '立体几何', mastery: 62, importance: '中' },
  { name: '解析几何', mastery: 55, importance: '高' },
  { name: '数列', mastery: 78, importance: '中' },
  { name: '概率与统计', mastery: 92, importance: '低' },
];

export let subjectKnowledgeTrendData = [
  { exam: '第一次', '集合与函数': 70, 解析几何: 40, 立体几何: 50 },
  { exam: '期中', '集合与函数': 75, 解析几何: 45, 立体几何: 55 },
  { exam: '第二次', '集合与函数': 78, 解析几何: 42, 立体几何: 52 },
  { exam: '联考', '集合与函数': 82, 解析几何: 50, 立体几何: 60 },
  { exam: '期末', '集合与函数': 85, 解析几何: 55, 立体几何: 62 },
];

export let classProgressRegressListsBySubject: Record<string, { progress: {name: string, score: number, change: number}[], regress: {name: string, score: number, change: number}[] }> = {
  '总分': {
    progress: [
      { name: '王梦琪', score: 615, change: 45 }, { name: '刘星宇', score: 580, change: 38 },
      { name: '陈子轩', score: 642, change: 35 }, { name: '赵俊杰', score: 520, change: 32 },
      { name: '黄嘉佳', score: 590, change: 28 }, { name: '吴佳妮', score: 480, change: 25 },
      { name: '周子涵', score: 560, change: 20 }, { name: '郑博文', score: 545, change: 18 },
      { name: '林心如', score: 625, change: 15 }, { name: '杨浩宇', score: 535, change: 12 },
      { name: '徐雅婷', score: 575, change: 10 }, { name: '郭宇航', score: 595, change: 8 },
    ],
    regress: [
      { name: '张浩然', score: 510, change: -40 }, { name: '李思颖', score: 590, change: -35 },
      { name: '孙家豪', score: 480, change: -30 }, { name: '马瑞霖', score: 630, change: -28 },
      { name: '朱雨欣', score: 550, change: -25 }, { name: '何泽宇', score: 500, change: -22 },
      { name: '罗文静', score: 585, change: -20 }, { name: '高明哲', score: 540, change: -18 },
      { name: '梁静茹', score: 520, change: -15 }, { name: '许家印', score: 460, change: -12 },
      { name: '冯宇航', score: 570, change: -10 }, { name: '沈佳宜', score: 610, change: -5 },
    ]
  }
};

export let subjectRatesList = [
  { subject: '语文', rates: [{name: '优秀', value: 15, fill: '#3b82f6'}, {name: '良好', value: 35, fill: '#10b981'}, {name: '及格', value: 30, fill: '#f59e0b'}, {name: '不及格', value: 20, fill: '#ef4444'}] },
  { subject: '数学', rates: [{name: '优秀', value: 25, fill: '#3b82f6'}, {name: '良好', value: 20, fill: '#10b981'}, {name: '及格', value: 35, fill: '#f59e0b'}, {name: '不及格', value: 20, fill: '#ef4444'}] },
  { subject: '英语', rates: [{name: '优秀', value: 20, fill: '#3b82f6'}, {name: '良好', value: 30, fill: '#10b981'}, {name: '及格', value: 35, fill: '#f59e0b'}, {name: '不及格', value: 15, fill: '#ef4444'}] },
  { subject: '物理', rates: [{name: '优秀', value: 18, fill: '#3b82f6'}, {name: '良好', value: 25, fill: '#10b981'}, {name: '及格', value: 37, fill: '#f59e0b'}, {name: '不及格', value: 20, fill: '#ef4444'}] },
  { subject: '化学', rates: [{name: '优秀', value: 22, fill: '#3b82f6'}, {name: '良好', value: 32, fill: '#10b981'}, {name: '及格', value: 36, fill: '#f59e0b'}, {name: '不及格', value: 10, fill: '#ef4444'}] },
  { subject: '生物', rates: [{name: '优秀', value: 30, fill: '#3b82f6'}, {name: '良好', value: 40, fill: '#10b981'}, {name: '及格', value: 25, fill: '#f59e0b'}, {name: '不及格', value: 5, fill: '#ef4444'}] },
];

export let subjectAvgData = [
  { subject: '语文', score: 82.3, rank: 1 },
  { subject: '数学', score: 72.1, rank: 6 },
  { subject: '英语', score: 79.8, rank: 2 },
  { subject: '物理', score: 71.3, rank: 5 },
  { subject: '化学', score: 75.6, rank: 3 },
  { subject: '生物', score: 74.2, rank: 4 },
];

export let classOverallAvgData = [
  { className: '高一(1)班', score: 593.2, rank: 2 },
  { className: '高一(2)班', score: 576.8, rank: 3 },
  { className: '高一(3)班', score: 568.5, rank: 4 },
  { className: '高一(4)班', score: 558.7, rank: 5 },
  { className: '高一(5)班', score: 547.1, rank: 6 },
  { className: '高一(6)班', score: 534.6, rank: 7 },
];

export let classOverallRatesData = [
  { className: '高一(1)班', rates: [{name: '优秀', value: 20, fill: '#3b82f6'}, {name: '良好', value: 30, fill: '#10b981'}, {name: '及格', value: 35, fill: '#f59e0b'}, {name: '不及格', value: 15, fill: '#ef4444'}] },
  { className: '高一(2)班', rates: [{name: '优秀', value: 25, fill: '#3b82f6'}, {name: '良好', value: 35, fill: '#10b981'}, {name: '及格', value: 30, fill: '#f59e0b'}, {name: '不及格', value: 10, fill: '#ef4444'}] },
  { className: '高一(3)班', rates: [{name: '优秀', value: 15, fill: '#3b82f6'}, {name: '良好', value: 25, fill: '#10b981'}, {name: '及格', value: 40, fill: '#f59e0b'}, {name: '不及格', value: 20, fill: '#ef4444'}] },
  { className: '高一(4)班', rates: [{name: '优秀', value: 22, fill: '#3b82f6'}, {name: '良好', value: 32, fill: '#10b981'}, {name: '及格', value: 36, fill: '#f59e0b'}, {name: '不及格', value: 10, fill: '#ef4444'}] },
  { className: '高一(5)班', rates: [{name: '优秀', value: 18, fill: '#3b82f6'}, {name: '良好', value: 32, fill: '#10b981'}, {name: '及格', value: 35, fill: '#f59e0b'}, {name: '不及格', value: 15, fill: '#ef4444'}] },
  { className: '高一(6)班', rates: [{name: '优秀', value: 19, fill: '#3b82f6'}, {name: '良好', value: 29, fill: '#10b981'}, {name: '及格', value: 37, fill: '#f59e0b'}, {name: '不及格', value: 15, fill: '#ef4444'}] },
];

export let classSubjectAvgData: Record<string, { subject: string; score: number; rank: number }[]> = {
  '高一(1)班': [
    { subject: '语文', score: 81.0, rank: 3 },
    { subject: '数学', score: 85.5, rank: 2 },
    { subject: '英语', score: 83.2, rank: 3 },
    { subject: '物理', score: 78.5, rank: 4 },
    { subject: '化学', score: 82.0, rank: 3 },
    { subject: '生物', score: 84.8, rank: 2 },
  ],
  '高一(2)班': [
    { subject: '语文', score: 84.0, rank: 1 },
    { subject: '数学', score: 86.5, rank: 1 },
    { subject: '英语', score: 85.2, rank: 1 },
    { subject: '物理', score: 82.5, rank: 1 },
    { subject: '化学', score: 84.0, rank: 1 },
    { subject: '生物', score: 85.8, rank: 1 },
  ],
};

export let classSubjectRatesData: Record<string, { subject: string, rates: {name: string, value: number, fill: string}[] }[]> = {
  '高一(1)班': [
    { subject: '语文', rates: [{name: '优秀', value: 18, fill: '#3b82f6'}, {name: '良好', value: 32, fill: '#10b981'}, {name: '及格', value: 35, fill: '#f59e0b'}, {name: '不及格', value: 15, fill: '#ef4444'}] },
    { subject: '数学', rates: [{name: '优秀', value: 22, fill: '#3b82f6'}, {name: '良好', value: 28, fill: '#10b981'}, {name: '及格', value: 35, fill: '#f59e0b'}, {name: '不及格', value: 15, fill: '#ef4444'}] },
    { subject: '英语', rates: [{name: '优秀', value: 20, fill: '#3b82f6'}, {name: '良好', value: 30, fill: '#10b981'}, {name: '及格', value: 35, fill: '#f59e0b'}, {name: '不及格', value: 15, fill: '#ef4444'}] },
    { subject: '物理', rates: [{name: '优秀', value: 15, fill: '#3b82f6'}, {name: '良好', value: 25, fill: '#10b981'}, {name: '及格', value: 40, fill: '#f59e0b'}, {name: '不及格', value: 20, fill: '#ef4444'}] },
    { subject: '化学', rates: [{name: '优秀', value: 19, fill: '#3b82f6'}, {name: '良好', value: 31, fill: '#10b981'}, {name: '及格', value: 38, fill: '#f59e0b'}, {name: '不及格', value: 12, fill: '#ef4444'}] },
    { subject: '生物', rates: [{name: '优秀', value: 25, fill: '#3b82f6'}, {name: '良好', value: 35, fill: '#10b981'}, {name: '及格', value: 30, fill: '#f59e0b'}, {name: '不及格', value: 10, fill: '#ef4444'}] },
  ],
  '高一(2)班': [
    { subject: '语文', rates: [{name: '优秀', value: 25, fill: '#3b82f6'}, {name: '良好', value: 40, fill: '#10b981'}, {name: '及格', value: 25, fill: '#f59e0b'}, {name: '不及格', value: 10, fill: '#ef4444'}] },
    { subject: '数学', rates: [{name: '优秀', value: 30, fill: '#3b82f6'}, {name: '良好', value: 35, fill: '#10b981'}, {name: '及格', value: 25, fill: '#f59e0b'}, {name: '不及格', value: 10, fill: '#ef4444'}] },
    { subject: '英语', rates: [{name: '优秀', value: 28, fill: '#3b82f6'}, {name: '良好', value: 38, fill: '#10b981'}, {name: '及格', value: 24, fill: '#f59e0b'}, {name: '不及格', value: 10, fill: '#ef4444'}] },
    { subject: '物理', rates: [{name: '优秀', value: 24, fill: '#3b82f6'}, {name: '良好', value: 36, fill: '#10b981'}, {name: '及格', value: 30, fill: '#f59e0b'}, {name: '不及格', value: 10, fill: '#ef4444'}] },
    { subject: '化学', rates: [{name: '优秀', value: 26, fill: '#3b82f6'}, {name: '良好', value: 36, fill: '#10b981'}, {name: '及格', value: 28, fill: '#f59e0b'}, {name: '不及格', value: 10, fill: '#ef4444'}] },
    { subject: '生物', rates: [{name: '优秀', value: 32, fill: '#3b82f6'}, {name: '良好', value: 38, fill: '#10b981'}, {name: '及格', value: 22, fill: '#f59e0b'}, {name: '不及格', value: 8, fill: '#ef4444'}] },
  ],
};

export let classComparisonData = [
  { class: '高一(1)班', score: 83.6 },
  { class: '高一(2)班', score: 79.4 },
  { class: '高一(3)班', score: 76.8 },
  { class: '高一(4)班', score: 73.2 },
  { class: '高一(5)班', score: 70.1 },
  { class: '高一(6)班', score: 68.3 },
  { class: '高一(7)班', score: 66.9 },
  { class: '高一(8)班', score: 65.2 },
];

export let scoreDistributionData = [
  { range: '0-59', count: 18, percentage: 0.6 },
  { range: '60-69', count: 72, percentage: 2.3 },
  { range: '70-79', count: 192, percentage: 6.2 },
  { range: '80-89', count: 436, percentage: 14.1 },
  { range: '90-99', count: 728, percentage: 23.5 },
  { range: '100-109', count: 912, percentage: 29.5 },
  { range: '110-119', count: 756, percentage: 24.5 },
  { range: '120-129', count: 468, percentage: 15.1 },
  { range: '130-139', count: 192, percentage: 6.2 },
  { range: '140-150', count: 64, percentage: 2.1 },
];

export let questionTypeData = [
  { name: '选择题', value: 36.7, fill: '#3b82f6' },
  { name: '填空题', value: 24.9, fill: '#10b981' },
  { name: '解答题', value: 28.5, fill: '#f59e0b' },
  { name: '综合题', value: 10.0, fill: '#6366f1' },
];

export let knowledgePointData = [
  { name: '集合与函数', rate: 82.1 },
  { name: '不等式', rate: 72.4 },
  { name: '三角函数', rate: 68.5 },
  { name: '数列', rate: 65.3 },
  { name: '平面向量', rate: 62.7 },
  { name: '立体几何', rate: 56.2 },
  { name: '解析几何', rate: 48.6 },
];

export let topImprovedStudents = [
  { rank: 1, name: '李思远', change: '+28' },
  { rank: 2, name: '王之涵', change: '+21' },
  { rank: 3, name: '张子墨', change: '+17' },
  { rank: 4, name: '陈雨桐', change: '+15' },
  { rank: 5, name: '刘宇辰', change: '+13' },
];

export let warningStudents = [
  { name: '赵一航', reason: '较上次退步12名, 数学退步明显' },
  { name: '周子涵', reason: '较上次退步9名, 英语、物理需加强' },
  { name: '吴佳怡', reason: '较上次退步8名, 基础知识掌握不牢' },
];

export let studentList = [
    { rank: 1, name: '李明轩', id: '20240103001', total: 612, classRank: 1, chinese: 128, math: 145, english: 139 },
    { rank: 2, name: '张子涵', id: '20240103002', total: 598, classRank: 2, chinese: 123, math: 142, english: 133 },
    { rank: 3, name: '王思睿', id: '20240103003', total: 586, classRank: 3, chinese: 118, math: 136, english: 132 },
    { rank: 4, name: '陈雨桐', id: '20240103004', total: 572, classRank: 4, chinese: 114, math: 134, english: 124 },
    { rank: 5, name: '刘宇航', id: '20240103005', total: 563, classRank: 5, chinese: 112, math: 129, english: 122 },
    { rank: 6, name: '赵欣怡', id: '20240103006', total: 551, classRank: 6, chinese: 109, math: 128, english: 114 },
]

export let classVsGradeData = [
  { subject: '语文', class: 82.3, grade: 78.1 },
  { subject: '数学', class: 85.6, grade: 80.2 },
  { subject: '英语', class: 88.1, grade: 83.4 },
  { subject: '物理', class: 76.4, grade: 72.3 },
  { subject: '化学', class: 75.2, grade: 71.0 },
  { subject: '生物', class: 70.3, grade: 66.8 },
];

export let subjectScoreDistData = [
  { range: '0-49', count: 2.1 },
  { range: '50-59', count: 6.8 },
  { range: '60-69', count: 17.5 },
  { range: '70-79', count: 28.4 },
  { range: '80-89', count: 26.1 },
  { range: '90-100', count: 14.7 },
];

export let gradeScoreDistData = [
  { range: '0-299', count: 12 },
  { range: '300-399', count: 45 },
  { range: '400-499', count: 156 },
  { range: '500-599', count: 342 },
  { range: '600-699', count: 520 },
  { range: '700-750', count: 181 },
];

export let multipleExamData = [
  { exam: '期中\n(10月)', avgScore: 525.6, excellentRate: 18.7, goodRate: 25.1, passRate: 31.4, lowRate: 24.8, highSeg: 132, midSeg: 724, lowSeg: 144 },
  { exam: '期末\n(1月)', avgScore: 548.7, excellentRate: 21.3, goodRate: 28.5, passRate: 31.4, lowRate: 18.8, highSeg: 158, midSeg: 722, lowSeg: 120 },
  { exam: '一模\n(3月)', avgScore: 566.2, excellentRate: 23.5, goodRate: 30.1, passRate: 30.2, lowRate: 16.2, highSeg: 176, midSeg: 708, lowSeg: 116 },
  { exam: '二模\n(5月)', avgScore: 569.8, excellentRate: 24.8, goodRate: 32.5, passRate: 28.1, lowRate: 14.6, highSeg: 184, midSeg: 696, lowSeg: 112 },
  { exam: '期中\n(6月)', avgScore: 582.4, excellentRate: 27.1, goodRate: 33.2, passRate: 26.5, lowRate: 13.2, highSeg: 196, midSeg: 688, lowSeg: 106 },
];


export const updateMockData = (newData: any) => {
  if (newData.kpiData) kpiData = newData.kpiData;
  if (newData.classComparisonData) classComparisonData = newData.classComparisonData;
  if (newData.yearTrendDataNew) yearTrendDataNew = newData.yearTrendDataNew;
  if (newData.classSingleScoreDistBySubject) classSingleScoreDistBySubject = newData.classSingleScoreDistBySubject;
  if (newData.classSingleStudentData) classSingleStudentData = newData.classSingleStudentData;
  if (newData.classMultipleStudentsData) classMultipleStudentsData = newData.classMultipleStudentsData;
  if (newData.classSubjectRatesData) classSubjectRatesData = newData.classSubjectRatesData;
  if (newData.subjectScoreDistData) subjectScoreDistData = newData.subjectScoreDistData;
  if (newData.classSingleLevelDist) classSingleLevelDist = newData.classSingleLevelDist;
  if (newData.classMultipleScoreDistBySubject) classMultipleScoreDistBySubject = newData.classMultipleScoreDistBySubject;
};
