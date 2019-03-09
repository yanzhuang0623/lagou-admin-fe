import SMERouter from 'sme-router'
const homeCtrl = require('../controller/homeCtrl')
const positionCtrl = require('../controller/positionCtrl')
const positionAddCtrl = require('../controller/positionAddCtrl')
const router = new SMERouter('router-view')

// route config
router.route('/home', (req, res, next) => {
  homeCtrl.routeCallBack({req, res, next, router})
})

router.route('/position', (req, res, next) => {
  positionCtrl.routeCallBack({req, res, next, router})
})

router.route('/position/add', (req, res, next) => {
  positionAddCtrl.routeCallBack({req, res, next, router})
})

router.route('*', (req, res, next) => {
  res.redirect('/home')
})