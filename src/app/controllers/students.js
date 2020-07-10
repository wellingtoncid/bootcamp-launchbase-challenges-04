const { age, date, education, } = require('../../lib/utils')
const Intl = require('intl')

module.exports = {
    index(req, res) {
        // const students = data.students.map(function (student) {
        //     const spreadStudent = {
        //         ...student,
        //         attendence: student.attendence.split(',')
        //     }
        //     return spreadStudent
        // })

        return res.render('students/index', { students })
    },
    create(req, res) {
        return res.render('students/create')
    },
    post(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == '')
                return res.send('Please complete all fields.')
        }

        return

    },
    show(req, res) {
        return
    },
    edit(req, res) {
        return
    },
    put(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == '')
                return res.send('Please complete all fields.')
        }
        return
    },
    delete(req, res) {
        return
    },
}