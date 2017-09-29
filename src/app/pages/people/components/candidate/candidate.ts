export interface Candidate {
  check: boolean;
  candidate_id: number;
  name_cn: string;
  name_en: string;
  status: string;
  location: any;
  service_line: any;
  if_group: string;
  gender: string;
  phone: string;
  position: any;
  degree: string;
  type: string;
  assign_date: string;
  email: string;
  channel: string;
  recommender: string;
  receive_date: string;
  bachelor_school: string;
  bachelor_major: string;
  master_school: string;
  master_major: string;
  university: string ;
  major: string;
  graduation_date: string;
  if_active: string;
}
export interface Interview {
  id?: number;
  candidate_id?: number;
  interviewer: string;
	status: string;
	date: string;
	sum: string;
	passed: string;
	score1: string;
	question1: string;
	score2: string;
	question2: string;
	score3: string;
	question3: string;
	score4: string;
	question4: string;
	score5: string;
	question5: string;
	score6: string;
	question6: string;
	score7: string;
	question7: string;
	score8: string;
	question8: string;
	score9: string;
  question9: string;
  score10: string;
  score11: string;
  score12: string;
  score13: string;
	comment: string;
	created_date: string;
	created_by: string;
}
export function createCandidate(): Candidate{
  let candidate = {
    check: false,
    candidate_id: null,
    name_cn: null,
    name_en: null,
    status: null,
    location: null,
    service_line: null,
    if_group: null,
    gender: null,
    phone: null,
    position: null,
    degree: null,
    type: null,
    assign_date: null,
    email: null,
    channel: null,
    recommender: null,
    receive_date: null,
    bachelor_school: null,
    bachelor_major: null,
    master_school: null,
    master_major: null,
    university: null,
    major: null,
    graduation_date: null,
    if_active: null,
  }
  return candidate;
}
export function createInterview(): Interview {
  let interview = {
    candidate_id: null,
    interviewer: null,
    status: null,
    date: null,
    sum: null,
    passed: null,
    score1: null,
    question1: null,
    score2: null,
    question2: null,
    score3: null,
    question3: null,
    score4: null,
    question4: null,
    score5: null,
    question5: null,
    score6: null,
    question6: null,
    score7: null,
    question7: null,
    score8: null,
    question8: null,
    score9: null,
    question9: null,
    score10: null,
    score11: null,
    score12: null,
    score13: null,
    comment: null,
    created_date: null,
    created_by: null,
  }
  return interview;
}
export const config = {
  service_line: [
    { 
      id: 1,
      name: 'Marketing Technology',
      position: [
        {
          id: 1,
          text: 'System Analyst (Marketing Campaign) (系统分析师 (营销活动))',
          value: 'Campaign',
        },
        {
          id: 2,
          text: 'Database/Data Warehouse/ETL Developer (数据库/数据仓库/ETL 开发工程师)',
          value: 'Dev',
        },
        {
          id: 3,
          text: 'Database Production Analyst (数据库运营分析师)',
          value: 'Operation',
        },
        {
          id: 4,
          text: 'Database/Data Warehouse/ETL Quality Assurance Analyst (数据库/数据仓库/ETL 测试工程师)',
          value: 'QA',
        },
      ],
    },
    { 
      id: 2,
      name: 'Analytics and Data Products',
      position: [
        {
          id: 1,
          text: 'Statistical Analyst/Data Analyst/Marketing Analyst (or Intern) (统计分析师/数据分析师/营销分析师)',
          value: 'Statistical Analyst',
        },
        {
          id: 2,
          text: 'Website Analyst(网站优化分析师)',
          value: 'Website Analyst',
        },
        {
          id: 3,
          text: 'Web Technical Analyst(网站数据技术师)',
          value: 'Web Technical Analyst',
        },
      ],
    },
    {
      id: 3,
      name: 'Digital Marketing',
      position: [
        {
          id: 1,
          text: 'Email/Front-end Developer (电子邮件/前端开发工程师)',
          value: 'Email Dev',
        },
        {
          id: 2,
          text: 'Media Optimization Specialist (广告媒体优化专员)',
          value: 'Graphic Dessigner',
        },
        {
          id: 3,
          text: 'Digital/Media Analyst（媒体分析师）',
          value: 'Media Analyst',
        },
      ],
    },
    { 
      id: 4,
      name: 'Digital Analytics',
      position: [
        {
          id: 1,
          text: 'Statistical Analyst/Data Analyst/Marketing Analyst (or Intern) (统计分析师/数据分析师/营销分析师)',
          value: 'Statistical Analyst',
        },
        {
          id: 2,
          text: 'Website Analyst(网站优化分析师)',
          value: 'Website Analyst',
        },
        {
          id: 3,
          text: 'Web Technical Analyst(网站数据技术师)',
          value: 'Web Technical Analyst',
        },
      ],
    },
    
  ],
  degree: [
    {
      id: 1,
      text: 'Bachelor',
    },
    {
      id: 2,
      text: 'Master',
    },
    {
      id: 3,
      text: 'Doctor',
    },
  ],
  type: [
    {
      id: 1,
      text: 'Fresh graduate',
    },
    {
      id: 2,
      text: 'Former graduate',
    },
  ],
  location: [
    {
      id: 1,
      text: 'Shanghai',
    },
    {
      id: 2,
      text: 'Nanjing',
    },
  ],
  QMG: 'Digital Analytics, Analytics and Data Products',
};
