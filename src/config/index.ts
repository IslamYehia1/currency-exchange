const getEnvironmentVariable = (environmentVariable: string): string => {
  const unvalidatedEnvironmentVariable = process.env[environmentVariable];
  if (!unvalidatedEnvironmentVariable) {
    throw new Error(
      `Couldn't find environment variable: ${environmentVariable}`
    );
  } else {
    return unvalidatedEnvironmentVariable;
  }
};
const config = {
  rapidKey: getEnvironmentVariable("RAPID_KEY"),
  rapidHost: getEnvironmentVariable("RAPID_HOST"),
};
export default config;
