function helperfn(){
    console.log(`List of all the commands:
                    node mycli.js view <dir-name> tree
                    node mycli.js view <dir-name> flat
                    node mycli.js organize <dir-name>
                    node mycli.js organize
                    node mycli.js help
    `);
}

module.exports = {    //Exports only those items which we add in it.
    fn: helperfn
};