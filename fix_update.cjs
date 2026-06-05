const fs = require('fs');
let content = fs.readFileSync('src/mock-data.ts', 'utf8');

const additional = `

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
`;

if (!content.includes('updateMockData')) {
  fs.writeFileSync('src/mock-data.ts', content + additional);
}
