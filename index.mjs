import jsonfile from 'jsonfile';
import moment from 'moment';
import simpleGit from 'simple-git';
import random from 'random-int';

const git = simpleGit();
const FILE_PATH = './data.json';

const makeCommit = async (n) => {
  if (n <= 0) {
    await git.push();
    console.log('✅ All commits pushed!');
    return;
  }

  const weeksAgo = random(0, 51); // Up to 1 year
  const daysOffset = random(0, 6); // Up to 6 days in a week
  const date = moment().subtract(1, 'year').add(weeksAgo, 'weeks').add(daysOffset, 'days').format('YYYY-MM-DDTHH:mm:ss');

  const data = {
    date
  };

  console.log(`📅 Commit on: ${date}`);

  await jsonfile.writeFile(FILE_PATH, data);
  await git.add([FILE_PATH]);
  await git.commit('📦 chore: backdated commit', {
    '--date': date
  });

  makeCommit(n - 1);
};

makeCommit(100);
