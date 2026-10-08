import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
const require = createRequire(import.meta.url);
const {chromium} = require(path.join(os.tmpdir(), 'ideal-solutions-browser-qa/node_modules/playwright-core'));
const browser = await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const output = fs.mkdtempSync(path.join(os.tmpdir(),'ideal-about-team-'));
const base = process.env.QA_BASE_URL || 'http://localhost:3001';
try {
  const page = await browser.newPage();
  const errors=[];
  page.on('pageerror', error=>errors.push(error.message));
  for (const width of [390,768,1440]) {
    await page.setViewportSize({width,height:900});
    assert.equal((await page.goto(`${base}/about`)).status(),200);
    const decline=page.getByRole('button',{name:'Decline',exact:true});
    if(await decline.isVisible())await decline.click();
    const buttons=page.getByRole('button',{name:/Read more about/});
    assert.equal(await buttons.count(),2);
    const body=await page.locator('main').innerText();
    for(const name of ['Olatunji Aduloju','Kayode Mejabi','Mahmoud Khallaf'])assert.ok(!body.includes(name));
    for (const name of ['Tosin Ayorinde','Ifeyemi Banjo-Aina']) {
      const trigger=page.getByRole('button',{name:`Read more about ${name}`,exact:true});
      await trigger.scrollIntoViewIfNeeded();
      await trigger.focus();
      const initialScroll=await page.evaluate(()=>scrollY);
      await page.keyboard.press('Enter');
      const dialog=page.getByRole('dialog',{name,exact:true});
      await dialog.waitFor();
      assert.equal(await dialog.getByRole('heading',{name,exact:true}).count(),1);
      await dialog.locator('img').evaluate(image=>image.decode());
      assert.ok((await dialog.innerText()).includes(name==='Tosin Ayorinde'?'University of Ilorin':'organisational coordination'));
      assert.ok(!(await dialog.innerText()).includes('Auxano'));
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
      assert.equal(await dialog.evaluate(el=>el.scrollWidth>el.clientWidth),false);
      for(let i=0;i<3;i++){
        await page.keyboard.press('Tab');
        assert.ok(await dialog.evaluate(el=>el.contains(document.activeElement)));
      }
      if(width!==768)await page.screenshot({path:path.join(output,`${width}-${name.split(' ')[0]}-dialog.png`)});
      await page.keyboard.press('Escape');
      await dialog.waitFor({state:'hidden'});
      assert.ok(await trigger.evaluate(el=>document.activeElement===el));
      assert.ok(Math.abs(await page.evaluate(()=>scrollY)-initialScroll)<5);
      await trigger.click();
      await page.getByRole('button',{name:'Close biography',exact:true}).click();
      await dialog.waitFor({state:'hidden'});
    }
    await buttons.first().scrollIntoViewIfNeeded();
    if(width===1440)await page.screenshot({path:path.join(output,'team-cards.png')});
  }
  assert.deepEqual(errors,[]);
  const sitemap=await (await fetch(`${base}/sitemap.xml`)).text();
  assert.ok(sitemap.includes('/image/about/ifeyemi-banjo-aina.webp'));
  assert.ok(sitemap.includes('/image/about/tosin-ayorinde.webp'));
  assert.ok(!sitemap.includes('/image/about/Mahmoud'));
  console.log(`About team checks passed: two people, both bios, keyboard open/close, focus trap and return, scroll restoration, no overflow at 390/768/1440, sitemap. Screenshots: ${output}`);
} finally {await browser.close();}
