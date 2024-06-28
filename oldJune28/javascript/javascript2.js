// Define function to fetch NHL team data
async function fetchTeamData(teamId) {
    const response = await fetch(`https://statsapi.web.nhl.com/api/v1/teams/${teamId}`);
    const data = await response.json();
    return data.teams[0];
}

// Define function to fetch NHL team roster
async function fetchTeamRoster(teamId) {
    const response = await fetch(`https://statsapi.web.nhl.com/api/v1/teams/${teamId}/roster`);
    const data = await response.json();
    return data.roster;
}

// Define function to fetch NHL team stats
async function fetchTeamStats(teamId) {
    const response = await fetch(`https://statsapi.web.nhl.com/api/v1/teams/${teamId}/stats`);
    const data = await response.json();
    return data.stats[0].splits[0].stat;
}

// Example usage
const teamId = 1; // Replace with the ID of the team you want to fetch data for
(async () => {
    const teamData = await fetchTeamData(teamId);
    const teamRoster = await fetchTeamRoster(teamId);
    const teamStats = await fetchTeamStats(teamId);

    console.log("Team Data:", teamData);
    console.log("Team Roster:", teamRoster);
    console.log("Team Stats:", teamStats);
    document.getElementById('this').innerHTML = teamData;
})();