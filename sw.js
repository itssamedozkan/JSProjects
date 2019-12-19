const CACHE ='JS_Class'
const FILES = ['style.css','/JSProjects/ClassWork1/ClassWork1.png', '/JSProjects/ClassWork2/Counting.html', '/JSProjects/ClassWork2/Fahrenait.html', '/JSProjects/ClassWork3/ClassWork3.png', '/JSProjects/ClassWork4/Courses.html','/JSProjects/ClassWork5/work/EloquentJS.html','/JSProjects/ClassWork6/FileOperation.html','/JSProjects/ClassWork7/Cw7.html','/JSProjects/cw8/classWork8.html','/JSProjects/ClassWork9/classWork9.html','/JSProjects/cw8/classWork8.html','/JSProjects/HomeWorks/poissonTable.html','/JSProjects/HomeWorks/sorting.html','/JSProjects/HomeWorks/sorting.js','/JSProjects/HomeWorks/hw2/Database.js','/JSProjects/HomeWorks/hw2/Courses.html'],['/JSProjects/HomeWorks/hw3.html']

function installCB(e) {
  e.waitUntil(
    caches.open(CACHE)
    .then(cache => cache.addAll(FILES))
    .catch(console.log)
  )
}
self.addEventListener('install', installCB)

function save(req, resp) {
  return caches.open(CACHE)
  .then(cache => {
    cache.put(req, resp.clone());
    return resp;
  })
  .catch(console.log)
}
function fetchCB(e) { //fetch first
  let req = e.request
  console.log('JS_Class', req.url);
  e.respondWith(
    fetch(req).then(r2 => save(req, r2))
    .catch(() => { return caches.match(req).then(r1 => r1) })
  )
}
self.addEventListener('fetch', fetchCB)
