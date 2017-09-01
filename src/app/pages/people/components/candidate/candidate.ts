export class Candidate {
  candidate_id:number;
  name_cn:string="";
  name_en: string = '';
  status:string="";
  service_line:string="";
  gender:string="";
  phone:string="";
  position:string="";
  degree: string = '';
  type: string = '';
  assign_date: string = '';
  email:string="";
  channel:string="";
  recommender:string="";
  receive_date:string="";
  bachelor_school:string="";
  bachelor_major:string="";
  master_school:string="";
  master_major:string="";
  create_date:string="";
}

export const config = {
  service_line: [
    { name: 'Marketing Technology',
      position: [
        'System Analyst (Marketing Campaign) (系统分析师 (营销活动))',
        'Database/Data Warehouse/ETL Developer (数据库/数据仓库/ETL 开发工程师)',
        'Database Production Analyst (数据库运营分析师)',
        'Database/Data Warehouse/ETL Quality Assurance Analyst (数据库/数据仓库/ETL 测试工程师)',
      ],
    },
    {
      name: 'Digital Analytics, Analytics and Data Products',
      position: [
        'Statistical Analyst/Data Analyst/Marketing Analyst (or Intern) (统计分析师/数据分析师/营销分析师)',
        'Website Analyst(网站优化分析师)',
        'Web Technical Analyst(网站数据技术师)',
      ],
    },
    {
      name: 'Digital Marketing Team',
      position: [
        'Email/Front-end Developer (电子邮件/前端开发工程师)',
        'Media Optimization Specialist (广告媒体优化专员)',
        'Digital/Media Analyst（媒体分析师）',
      ],
    },
  ],
  degree: [
    'bachelor',
    'master',
    'doctor',
  ],
  type: [
    'fresh graduate',
    'former graduate',
  ],
  location: [
    'Shanghai',
    'Nanjing',
  ],
};
