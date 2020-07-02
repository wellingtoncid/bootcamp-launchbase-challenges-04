module.exports = {
    age: function (timestamp) {
        const today = new Date()
        const dob = new Date(timestamp)

        let age = today.getFullYear() - dob.getFullYear()
        const month = today.getMonth() - dob.getMonth()


        if (month < 0 ||
            month == 0 &&
            today.getDate() <= dob.getDate()) {
            age = age - 1
        }

        return age

    },

    education: function(degree) {
        switch (degree) {
            case ('Associate'): return 'Associate'
            case ('Graduate'): return 'Graduate'
            case ('Master'): return 'Master'
            case ('Doctorate'): return 'Doctorate'
        }
    },

    date: function(timestamp) {
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return(`${year}-${month}-${day}`)
    }
}