// const projects = require('../../views/data/projects.js');

const getUrlPath = () => window.location.pathname;

function updatePageTitle(title = '') {
  const _getTitle = document.querySelector('title');

  title = title.length ? title : 'Home';

  _getTitle.innerText = title.toUpperCase();
}

async function updatePageView(routeTo, routeFrom = '0') {
  // console.log('update view');
  const mainOfDocument = document.querySelector('main');

  if (routeFrom == routeTo) return false;
  const getHtml = await fetch(routeTo);

  if (!getHtml.ok) {
    console.log('404');
    mainOfDocument.innerHTML = '<div><b>404</b></div>';
    return true;
  }

  const htmlText = await getHtml.text();
  const wrap = document.createElement('html');
  wrap.innerHTML = htmlText;
  const getMainElement = wrap.querySelector('main').innerHTML;

  mainOfDocument.innerHTML = getMainElement;

  updatePageTitle(routeTo.split('/')[1]);

  reLink();
  return true;
}

////---------SPA---------////
function reLink() {
  let _links = document.querySelectorAll('a');

  _links.forEach((item) => {
    item.onclick = async (e) => {
      e.preventDefault();

      const routeTo = item.getAttribute('href');
      const routeFrom = getUrlPath();
      const isUpdateSuccess = await updatePageView(routeTo, routeFrom);

      isUpdateSuccess &&
        window.history.pushState(null, '', item.getAttribute('href'));

      // reLink()
    };
  });
}
reLink();

window.onpopstate = async (e) => {
  const url = getUrlPath();

  await updatePageView(url);
  // reLink()
  // console.log('POP!', url);
};
