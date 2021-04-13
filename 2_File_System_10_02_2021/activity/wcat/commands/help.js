function helperCommands() {
    console.log(`List of all the commands
            wcat filename 
            wcat filename1 filename2 filename3... 
            wcat -s filename
            wcat -n filename
            wcat -b filename 
            wcat filename > filename2
            wcat filename >> filename2
            wcat -s filename > filename2`
        );
}

module.exports = {
    helperCommands: helperCommands
}