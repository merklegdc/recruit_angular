// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
const baseUrl = 'http://localhost/recruitment/home.php/';
export const environment = {
  production: false,
  baseUrl: 'http://localhost/recruitment/home.php/',
  indexUrl: `${baseUrl}Index/`,
  uploadUrl: `${baseUrl}Upload/`,
  interviewerUrl: `${baseUrl}Interviewer/`,
  candidateUrl: `${baseUrl}Candidate/`,
  interviewUrl: `${baseUrl}Interview/`,
  downloadUrl: `${baseUrl}Download/`,
  SearchUrl: `${baseUrl}Search/`,
};

