//var GoogleSpreadsheet = require('google-spreadsheet');
//var json_web_token = require('google-auth-library');

function get_date_string(){
    let d = new Date();
    return "Late updated data: " + d;
}

function get_camgaign_data()
{
    data = {
        name:"SEIGE OF THE TEMPLE OF THE EMPORER",
        value : 9000,
        forces:["PROTECTORS OF BALOR'S SHADE", "SAVIORS OF BALOR'S SHADE"],
        actions:
        [
            {name:"Game 1", value: 1850, winner: 0},
            {name:"Game 2", value: 500, winner: 1},
            {name:"Game 3", value: 2000, winner: -1},
            {name:"Game 5", value: 3000, winner: 1},
            {name:"Game 6", value: 1200, winner: 1},
        ]
    }
    return data
}

function get_force_summary(camgaign_data, force_idx)
{
    force_text = "  ++ ACTING FORCE " + (force_idx + 1);
    force_text += ": " + camgaign_data.forces[force_idx] + "\n";
    control = 0;
    for(action_idx = 0 ; action_idx < camgaign_data.actions.length; action_idx++)
    {
        action = camgaign_data.actions[action_idx];
        if(action.winner == force_idx)
            {
                control += action.value;
            }
        if(action.winner == -1)
            {
                control += action.value/2;
            }
    }

    force_text +="    THEATER CONTROL: " + control + "\n"
    percent_complete = Math.round(control/camgaign_data.value * 100);

    bar = Math.floor(percent_complete/2)
    force_text +="    [" + "=".repeat(bar) + " ".repeat(50-bar) +"]" + percent_complete +"%\n";
    return force_text;
}

function get_action_summary(camgaign_data, action_idx)
{
    action = camgaign_data.actions[action_idx];
    action_summary = " " + action.name + ": " + get_text_button("MODIFY ENTRY") + "\n";
    action_summary += "    THEATER VALUE: " + action.value + "\n";
    victor = "INCONCLUSIVE" 
    if(action.winner != -1)
        {
        victor = camgaign_data.forces[action.winner];
        }
    action_summary += "    VICTOR: " + victor + "\n"
    return action_summary;
}

function get_line_length()
{
    return 60;
}

function get_section_break()
 {
    return "+".repeat(get_line_length()) + "\n"
 }

 function get_text_button(button_text)
 {
    return "[<U>" +button_text + "</U>]"
 }

function get_campaign_text(camgaign_data)
{
    section_break = get_section_break();
    campaign_text = section_break+
    "OFFICE OF INQUISTOR TIBERIUS OF THE HOLY INQUISTION\n" +
    "MILITARY OPERATIONS REPORT:\n\t"+ camgaign_data.name + "\n" +
    section_break;
    campaign_text += "THEATER SUMMARY\n"+
    "THEATER VALUE: "+ camgaign_data.value + "\n";
    for(i = 0; i < camgaign_data.forces.length; i++)
        {
        campaign_text += get_force_summary(camgaign_data, i);
        }
    campaign_text += section_break;
    campaign_text += "MAJOR ACTIONS:\n"
    for(i = 0; i < camgaign_data.actions.length; i++)
        {
        campaign_text += get_action_summary(camgaign_data, i);
        }
    campaign_text += get_text_button("APPEND ENTRY") + "\n" + section_break;
    campaign_text += "THEATER NOTES\n--none--\n" + get_text_button("EDIT NOTES") +"\n" + section_break + 
    "KNOWLEGE IS POWER, GUARD IT WELL\n" +
    "END REPORT\n" + section_break;
    return campaign_text;
}

function myItems(jsonString){
  var json = JSON.parse(jsonString);
  var table = '<table><tr>'
  json.table.cols.forEach(colonne => table += '<th>' + colonne.label + '</th>')
  table += '</tr>'
  json.table.rows.forEach(ligne => {
    table += '<tr>'
    ligne.c.forEach(cellule => {
        try{var valeur = cellule.f ? cellule.f : cellule.v}
        catch(e){var valeur = ''}
        table += '<td>' + valeur + '</td>'
      }
    )
    table += '</tr>'
    }
  )
  table += '</table>'
  return table
}

data =  get_camgaign_data();
document.body.innerHTML += "<pre style=\"color: green; background-color: black\">"
+get_campaign_text(data)+"</pre> <p>" + get_date_string() + "</p>";

var id = '1n-rjSYb63Z2jySS3-M0BQ78vu8DTPOjG-SZM4i8IxXI';
var gid = '0';
var url = 'https://docs.google.com/spreadsheets/d/'+id+'/gviz/tq?tqx=out:json&tq&gid='+gid;
fetch(url)
  .then(response => response.text())
  .then(data => document.getElementById("json").innerHTML=myItems(data.slice(47, -2))  
  );