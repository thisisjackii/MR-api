import { Router } from 'express';
import welcomePageRoutes from './welcomePageRoutes.js'
import akunRoutes from './akunRoutes.js';
import hutangRoutes from './hutangRoutes.js';
import kategoriPemasukanRoutes from './kategoriPemasukanRoutes.js';
import kategoriPengeluaranRoutes from './kategoriPengeluaranRoutes.js';
import pemasukanRoutes from './pemasukanRoutes.js';
import pengeluaranRoutes from './pengeluaranRoutes.js';
import rekapBulananRoutes from './rekapBulananRoutes.js';
import riwayatMenabungRoutes from './riwayatMenabungRoutes.js';
import wishlistRoutes from './wishlistRoutes.js';

const router = Router();

// Define an array of route configurations
const routes = [
  { path: '/welcome', route: welcomePageRoutes },
  { path: '/akun', route: akunRoutes },
  { path: '/hutang', route: hutangRoutes },
  { path: '/kategori-pemasukan', route: kategoriPemasukanRoutes },
  { path: '/kategori-pengeluaran', route: kategoriPengeluaranRoutes },
  { path: '/pemasukan', route: pemasukanRoutes },
  { path: '/pengeluaran', route: pengeluaranRoutes },
  { path: '/rekap-bulanan', route: rekapBulananRoutes },
  { path: '/riwayat-menabung', route: riwayatMenabungRoutes },
  { path: '/wishlist', route: wishlistRoutes },
];

// Loop through the route configurations and set up routes
routes.forEach(routeName => {
  router.use(routeName.path, routeName.route);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

export default router;
