export class Candidate {
  candidate_id: number;
  name_cn: string="";
  name_en: string = '';
  status: string="";
  location: number = 0;
  service_line: number = 0;
  if_group: string;
  gender: string="";
  phone: string="";
  position: number = 0;
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
        },
        {
          id: 2,
          text: 'Database/Data Warehouse/ETL Developer (数据库/数据仓库/ETL 开发工程师)',
        },
        {
          id: 3,
          text: 'Database Production Analyst (数据库运营分析师)',
        },
        {
          id: 4,
          text: 'Database/Data Warehouse/ETL Quality Assurance Analyst (数据库/数据仓库/ETL 测试工程师)',
        },
      ],
    },
    { 
      id: 2,
      name: 'Digital Analytics, Analytics and Data Products',
      position: [
        {
          id: 1,
          text: 'Statistical Analyst/Data Analyst/Marketing Analyst (or Intern) (统计分析师/数据分析师/营销分析师)',
        },
        {
          id: 2,
          text: 'Website Analyst(网站优化分析师)',
        },
        {
          id: 3,
          text: 'Web Technical Analyst(网站数据技术师)',
        },
      ],
    },
    {
      id: 3,
      name: 'Digital Marketing Team',
      position: [
        {
          id: 1,
          text: 'Email/Front-end Developer (电子邮件/前端开发工程师)',
        },
        {
          id: 2,
          text: 'Media Optimization Specialist (广告媒体优化专员)',
        },
        {
          id: 3,
          text: 'Digital/Media Analyst（媒体分析师）',
        },
      ],
    },
  ],
  degree: [
    {
      id: 1,
      text: 'bachelor',
    },
    {
      id: 2,
      text: 'master',
    },
    {
      id: 3,
      text: 'doctor',
    },
  ],
  type: [
    {
      id: 1,
      text: 'fresh graduate',
    },
    {
      id: 2,
      text: 'former graduate',
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
