const express = require('express')


// const connection = require('../SQL/connection')

// class based method that will take in our routes an make a new instance
const router = express.Router()

// Import and destructure our controllers
const {getUsers, getUserById, addTODO, deleteTODO, updateTODO} = require('../controller/controllers')



router.get('/TODOList', getUsers)


router.get('/TODOList/:id', getUserById)

router.post('/TODOList/addTODO', addTODO)

router.delete('/TODOList/deleteTODO/:id', deleteTODO)

router.put('/TODOList/updateTODO/:id', updateTODO)
// export router here
module.exports = router
