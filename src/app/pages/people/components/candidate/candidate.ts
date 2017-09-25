export class Candidate {
  candidate_id: number;
  name_cn: string;
  name_en: string = '';
  status: string="";
  location: any;
  service_line: any;
  if_group: string;
  gender: string="";
  phone: string="";
  position: any;
  degree: string = '';
  type: string = '';
  assign_date: string = '';
  email: string="";
  channel: string="";
  recommender: string="";
  receive_date: string="";
  bachelor_school: string="";
  bachelor_major: string="";
  master_school: string="";
  master_major: string="";
  create_date: string="";
  university: string = '';
  major: string = '';
  graduation_date: string = '';
  cv_interviewer: string;
	cv_status: string;
	cv_date: string;
	cv_sum: string;
	cv_passed: string;
	cv_score1: string;
	cv_score2: string;
	cv_score3: string;
	cv_score4: string;
	cv_score5: string;
	cv_score6: string;
	cv_score7: string;
	cv_score8: string;
	cv_score9: string;
	cv_comment: string;
	cv_created_date: string;
	cv_created_by: string;
	phone_interviewer: string;
	phone_status: string;
	phone_date: string;
	phone_sum: string;
	phone_passed: string;
	phone_score1: string;
	phone_question1: string;
	phone_score2: string;
	phone_question2: string;
	phone_score3: string;
	phone_question3: string;
	phone_score4: string;
	phone_question4: string;
	phone_score5: string;
	phone_question5: string;
	phone_score6: string;
	phone_question6: string;
	phone_score7: string;
	phone_question7: string;
	phone_score8: string;
	phone_question8: string;
	phone_score9: string;
	phone_question9: string;
	phone_comment: string;
	phone_created_date: string;
	phone_created_by: string;
	group_interviewer: string;
	group_status: string;
	group_date: string;
	group_sum: string;
	group_passed: string;
	group_score1: string;
	group_question1: string;
	group_score2: string;
	group_question2: string;
	group_score3: string;
	group_question3: string;
	group_score4: string;
	group_question4: string;
	group_score5: string;
	group_question5: string;
	group_score6: string;
	group_question6: string;
	group_score7: string;
	group_question7: string;
	group_score8: string;
	group_question8: string;
	group_score9: string;
	group_question9: string;
	group_comment: string;
	group_created_date: string;
	group_created_by: string;
	onsite1_interviewer: string;
	onsite1_status: string;
	onsite1_date: string;
	onsite1_sum: string;
	onsite1_passed: string;
	onsite1_score1: string;
	onsite1_question1: string;
	onsite1_score2: string;
	onsite1_question2: string;
	onsite1_score3: string;
	onsite1_question3: string;
	onsite1_score4: string;
	onsite1_question4: string;
	onsite1_score5: string;
	onsite1_question5: string;
	onsite1_score6: string;
	onsite1_question6: string;
	onsite1_score7: string;
	onsite1_question7: string;
	onsite1_score8: string;
	onsite1_question8: string;
	onsite1_score9: string;
	onsite1_question9: string;
	onsite1_comment: string;
	onsite1_created_date: string;
	onsite1_created_by: string;
	onsite2_interviewer: string;
	onsite2_status: string;
	onsite2_date: string;
	onsite2_sum: string;
	onsite2_passed: string;
	onsite2_score1: string;
	onsite2_question1: string;
	onsite2_score2: string;
	onsite2_question2: string;
	onsite2_score3: string;
	onsite2_question3: string;
	onsite2_score4: string;
	onsite2_question4: string;
	onsite2_score5: string;
	onsite2_question5: string;
	onsite2_score6: string;
	onsite2_question6: string;
	onsite2_score7: string;
	onsite2_question7: string;
	onsite2_score8: string;
	onsite2_question8: string;
	onsite2_score9: string;
	onsite2_question9: string;
	onsite2_comment: string;
	onsite2_created_date: string;
	onsite2_created_by: string;
	onsite3_interviewer: string;
	onsite3_status: string;
	onsite3_date: string;
	onsite3_sum: string;
	onsite3_passed: string;
	onsite3_score1: string;
	onsite3_question1: string;
	onsite3_score2: string;
	onsite3_question2: string;
	onsite3_score3: string;
	onsite3_question3: string;
	onsite3_score4: string;
	onsite3_question4: string;
	onsite3_score5: string;
	onsite3_question5: string;
	onsite3_score6: string;
	onsite3_question6: string;
	onsite3_score7: string;
	onsite3_question7: string;
	onsite3_score8: string;
	onsite3_question8: string;
	onsite3_score9: string;
	onsite3_question9: string;
	onsite3_comment: string;
	onsite3_created_date: string;
	onsite3_created_by: string;
	onsite_status: string;
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
