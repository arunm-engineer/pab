function helpWithCommand() {
    console.log(`
        Check command
            prep ie <Location> <Company>
    `);
}

function helpWithCompany() {
    console.log(`
        Company experiences doesn't exist in site.
        Good luck!!
    `);
}

module.exports = {
    helpWithCommand: helpWithCommand,
    helpWithCompany: helpWithCompany
}