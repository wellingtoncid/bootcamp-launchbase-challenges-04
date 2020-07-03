const fs = require('fs')
const data = require("../data.json")
const {age, date, education,} = require('../utils')
const Intl = require('intl')

exports.index = function (req, res) {

    const teachers = data.teachers.map(function(teacher) {
        const spreadTeacher = {
            ...teacher,
            attendence: teacher.attendence.split(',')
        }
        return spreadTeacher
    })    

    return res.render('teachers/index', { teachers })
}

exports.create = function (req, res) {
    return res.render('teachers/create')
}

exports.show = function (req,res) {
    const { id } = req.params

    const foundTeacher = data.teachers.find(function(teacher){
        return teacher.id == id
    })

    if (!foundTeacher) return res.send('Teacher not found')

    const teacher = {
        ...foundTeacher,
        age: age(foundTeacher.dob),
        degree: education(foundTeacher.degree),
        attendence: foundTeacher.attendence.split(","),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundTeacher.create),
    }

    return res.render('teachers/show', { teacher })

}

exports.post = function (req, res) {

    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == '')
            return res.send('Please complete all fields.')
    }

    let {avatar_url, name, dob, degree, type_class, attendence} = req.body

    dob = Date.parse(dob)
    const created_at = Date.now()
    const id = Number(data.teachers.length + 1)
    
    data.teachers.push({
        id,
        avatar_url,
        name,
        dob,
        degree,
        type_class,
        attendence,
        created_at
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error")
        return res.redirect('/teachers')
    })

    // return res.send(req.body)
}

exports.edit = function (req, res) {
    const { id } = req.params

    const foundTeacher = data.teachers.find(function (teacher) {
        return teacher.id == id
    })

    if (!foundTeacher) return res.send('Teacher not found')

    const teacher = {
        ...foundTeacher,
        dob: date(foundTeacher.dob).iso
    }

    return res.render('teachers/edit', { teacher })
}

exports.put = function(req,res) {
    const { id } = req.body
    let index = 0

    const foundTeacher = data.teachers.find(function(teacher, foundIndex) {
        if (id == teacher.id) {
            index = foundIndex
            return true
        }
    })

    if (!foundTeacher) return res.send('Teacher not found')

    const teacher = {
        ...foundTeacher,
        ...req.body,
        dob: Date.parse(req.body.dob),
        id: Number(foundTeacher.id)
    }

    data.teachers[index] = teacher

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("Write file error")

        return res.redirect(`/teachers/${id}`)
    })

}

exports.delete = function(req,res) {
    const { id } = req.body

    const filteredTeachers = data.teachers.filter(function(teacher) {
        return teacher.id != id
    })

    data.teachers = filteredTeachers

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Write file error")

        return res.redirect('/teachers')
    })

}