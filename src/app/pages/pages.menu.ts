export const PAGES_MENU = [
  {
    path: 'pages',
    children: [
      {
        path: 'dashboard',
        data: {
          menu: {
            title: 'general.menu.dashboard',
            icon: 'ion-android-home',
            selected: false,
            expanded: false,
            order: 0,
          },
        },
      },
      {
        path: 'people',
        data: {
          menu: {
            title: 'People',
            icon: 'ion-compose',
            selected: false,
            expanded: false,
            order: 400,
          },
        },
        children: [
          {
            path: 'interviewer',
            data: {
              menu: {
                title: 'Interviewer',
              },
            },
          },
          {
            path: 'addCandidate',
            data: {
              menu: {
                title: 'Add Candidate',
              },
            },
          },
          {
            path: 'viewCandidate',
            data: {
              menu: {
                title: 'Candidate Overview',
              },
            },
          },
        ],
      },
      {
        path: 'interview',
        data: {
          menu: {
            title: 'Interview',
            icon: 'ion-compose',
            selected: false,
            expanded: false,
            order: 400,
          },
        },
        children: [
          {
            path: 'scoringcard',
            data: {
              menu: {
                title: 'Scoring Card',
              },
            },
          },
          {
            path: 'fillscore',
            data: {
              menu: {
                title: 'Fill Score',
              },
            },
          },
        ],
      },
      {
        path: 'charts',
        data: {
          menu: {
            title: 'general.menu.charts',
            icon: 'ion-stats-bars',
            selected: false,
            expanded: false,
            order: 200,
          },
        },
        children: [
          {
            path: 'chartist-js',
            data: {
              menu: {
                title: 'general.menu.chartist_js',
              },
            },
          },
        ],
      },
    ],
  },
];
