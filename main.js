var gmail;


function refresh(f) {
  if( (/in/.test(document.readyState)) || (typeof Gmail === undefined) ) {
    setTimeout('refresh(' + f + ')', 10);
  } else {
    f();
  }
}


var main = function(){
  // NOTE: Always use the latest version of gmail.js from
  // https://github.com/KartikTalwar/gmail.js
    gmail = new Gmail();


    //Get observer for compose
    gmail.observe.on("compose", function(compose, type) {
        // type can be compose, reply or forward
        //Add compose button
        let button = '<button type="button">Table!</button>'
        
        gmail.tools.add_compose_button(compose, button, function() {
            // Code here

            let table = `
                Rows: <input id="rows" class="rows" type="number" min="1" />
                Columns: <input id="columns" class="columns" type="number" min="1" />
            `
            
            gmail.tools.add_modal_window('Table details', table, function(e) {
                
                let children = $("#gmailJsModalWindowContent").children()
                console.log("main -> children", children)
                let rows = children[0].value
                let columns = children[1].value
                let temp = columns
                console.log("main -> rows", rows, columns)
                
                
                //TODO : This code is not working on live but working in console.
                // let data = `
                //     <div>
                //     <table>
                //         ${
                //             Array(rows).join(0).split(0).map((row, j) => `
                //                 <tr> ${j}
                //                     ${
                //                         Array(columns).join(0).split(0).map((column, i) => `
                //                             <td>${i}</td>
                //                         `).join('')
                //                     }
                //                 </tr>
                //             `).join('')
                //         }
                //     </table>
                //     </div>`
                // console.log("main -> data", data)
               
                //Create table based on above data
                let final = []
                final.push('<table style="border: 1px solid black"><tr>')
                while (temp) {
                    final.push('<th>Lorem Ipsum</th>')
                    temp--
                }
                final.push('</tr>')
                for (let row = 0; row < rows; row++) {
                    let columnArray = []
                    columnArray.push('<tr>')
                    //Columns
                    for (let column = 0; column < columns; column++) {
                        columnArray.push('<td style="width=200px; border: 1px solid black"></td>')
                    }
                    columnArray.push('</tr>')
                    final = [...final, ...columnArray]
                }
                final.push('</table>')
                console.log("main -> final", final)
                //Insert table to body
                var body = compose.body()
                        
                compose.body(final + body)
            });
    
        }, 'Custom Style Classes');
    });

}

refresh(main);

