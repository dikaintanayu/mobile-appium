const {remote} = require('webdriverio');

const capabilities = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': 'emulator-5554',
  'appium:appPackage': 'com.fghilmany.dietmealapp',
  'appium:appActivity': 'com.fghilmany.dietmealapp.ui.main.MainActivity',
};

const wdOpts = {
  hostname: process.env.APPIUM_HOST || 'localhost',
  port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
  logLevel: 'info',
  capabilities,
};

async function runTest() {
  const driver = await remote(wdOpts);
  try {
    const nameTextBox = await driver.$('//*[@text="Name"]');
    const weightTextBox = await driver.$('//*[@text="Weight"]');
    const heightTextBox = await driver.$('//*[@text="Height"]');
    const femaleCheckBox = await driver.$('//*[@text="Female"]');
    const nextButton = await driver.$('//*[@text="NEXT"]');
    const dailyActivity = await driver.$('//*[@text="Tidur, Rebahan, Duduk, dsj."]');
    const selesaiButton = await driver.$('//*[@text="SELESAI"]');
    const dashboardText = await driver.$('//*[@text="Ready to some calories today?"]');

    await nameTextBox.setValue("Dika")
    await weightTextBox.setValue('50');
    await heightTextBox.setValue('60');
    await femaleCheckBox.click();
    await nextButton.click();
    await dailyActivity.click();
    await selesaiButton.click();
    await expect(dashboardText).toBeDisplayed()

    
  } finally {
    await driver.pause(1000);
    await driver.deleteSession();
  }
}

runTest().catch(console.error);