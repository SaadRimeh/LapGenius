import { Router } from 'express'
import clients from './routes/clients.js'
import admins from './routes/admins.js'
import laptops from './routes/laptops.js'
import orders from './routes/orders.js'
import purchases from './routes/purchases.js'
import submits from './routes/submits.js'
import manage from './routes/manage.js'
import cancels from './routes/cancels.js'
import dates from './routes/dates.js'
import cart from './routes/cart.js'

export const router = Router()

router.use('/client', clients)
router.use('/admin', admins)
router.use('/laptop', laptops)
router.use('/order', orders)
router.use('/purchase', purchases)
router.use('/submit', submits)
router.use('/manage', manage)
router.use('/cancle', cancels)
router.use('/date', dates)
router.use('/cart', cart)


