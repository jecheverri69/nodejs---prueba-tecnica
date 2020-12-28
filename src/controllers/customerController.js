const { rows } = require("mssql");


const controller = {};









controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('select * from days where time_total != 0', (err, rows) => {
            if(err){
                next(err);
            };


            res.render('customer',{
                data: rows
            });

        });

    });
};



controller.add = (req, res) => {
    var accumulated;
    var available;
    var arraydays = [];
    arraydays.push(0);
    var arraytime_total = [];
    var arraytime_total2 = [];
    var day;
    var change;
    req.getConnection((err, conn) => {
        conn.query('UPDATE days SET flag = 1 where flag = 0 and time_total = 16', (err, change) => {
        })});
    req.getConnection((err, conn) => {
        conn.query('UPDATE days SET flag = 1 where flag = 0 AND time_total = 4 AND name = "Sabado"' , (err, change) => {
        })});
        





    //pedido del formulario
    const nameform = req.body;

    switch (nameform['name']) {
        case 'Toyota':
            var time = 4;
            break;

        case 'Chevrolet':
            var time = 2;
            break;

        case 'Ford':
            var time = 3;
            break;

        case 'Renault':
            var time = 1;
            break;
        default:
            break;
    };

    function newday(){
        req.getConnection((err, conn) => {
            conn.query('select name from days ORDER BY id DESC LIMIT 1', (err, days) => {
                otherday(days[0]['name']);
            })});
    }
    function otherday(namedaynew){

        switch (namedaynew) {
            case 'Lunes':



                var sql3 = "INSERT INTO days (name, time_total, flag, available) VALUES ('Martes',0,0,16)"
                           
            
                req.getConnection((err, conn) => {
                    conn.query(sql3, (err, insert) => {})});
                
            break;
            case 'Martes':

                var sql3 = "INSERT INTO days (name, time_total, flag, available) VALUES ('Miercoles',0,0,16)"
                           
            
                req.getConnection((err, conn) => {
                    conn.query(sql3, (err, insert) => {})});
                
            break;
            case 'Miercoles':
                var sql3 = "INSERT INTO days (name, time_total, flag, available) VALUES ('Jueves',0,0,16)"
                           
            
                req.getConnection((err, conn) => {
                    conn.query(sql3, (err, insert) => {})});
            
                
            break;
            case 'Jueves':
                var sql3 = "INSERT INTO days (name, time_total, flag, available) VALUES ('Viernes',0,0,16)"
                           
            
                req.getConnection((err, conn) => {
                    conn.query(sql3, (err, insert) => {})});
            
            break;
            case 'Viernes':
                var sql3 = "INSERT INTO days (name, time_total, flag, available) VALUES ('Sabado',0,0,4)"
                           
            
                req.getConnection((err, conn) => {
                    conn.query(sql3, (err, insert) => {})});
            
            break;
            case 'Sabado':

                var sql3 = "INSERT INTO days (name, time_total, flag, available) VALUES ('Lunes',0,0,16)"
                           
            
                req.getConnection((err, conn) => {
                    conn.query(sql3, (err, insert) => {})});
            
            break;
            default:
                break;
        }
    }
    function last(){
        req.getConnection((err, conn) => {
            conn.query('select id from days ORDER BY id DESC LIMIT 1', (err, days) => {
                consultar(days[0]['id']);
            })});
    }


    //llamar el ultimo dia disponible
    req.getConnection((err, conn) => {
        conn.query('select * from days where flag = 0', (err, days) => {

            if (days.length == 0) {
               newday();
               last();
            
                
            
            
            
            
            
            }
                
            

            days.forEach(day =>


             arraydays.push(day['id']),

            
            

          )
          consultar(arraydays)
     });
        });

function consultar(arrayday){
    var sql = 'select time_total from days where id in ('+arrayday.toString()+')'
    console.log(sql);
    req.getConnection((err, conn) => {
        conn.query(sql, (err, times) => {

            for (var i = 0; i < times.length; i++) {
                var times2 = times[i];
                var timesId = times2;
                arraytime_total.push(JSON.parse(JSON.stringify(timesId)));
              }
            
for (var i = 0; i < arraytime_total.length; i++){
            arraytime_total2.push(arraytime_total[i]['time_total']);
}
clasificar(arraytime_total2);
     });
        });
        
}


function message(){


    alert('no se pudo en este dia, por favor intentelo de nuevo')
}


function clasificar(arrayclas = []){

var suma = 0
    for (var i = 0; i < arrayclas.length; i++){
        suma = time + parseInt(arrayclas[i]);

        if (suma > 16){

            console.log('no se puede '+suma);
            newday();
            
            
            
            

        }else{
            console.log('si se puede');
            var sql2 = 'select id from days where flag = 0 and time_total = '+parseInt(arrayclas[i])
            req.getConnection((err, conn) => {
                conn.query(sql2, (err, idadd) => {

                add(idadd[0]['id'],nameform['name'],time,parseInt(arrayclas[i]));
                
                
                })});



            break;
        }



    }




}

function add(id,car,time,time_final){
var sql3 = "INSERT INTO tasks (name, time, days_id) VALUES ('"+car+"', "+time+", "+id+")";
    console.log(sql3)



    req.getConnection((err, conn) => {
        conn.query(sql3, (err, insert) => {
                    
            update(time_final,id,time);
        
        
        })});

};
function update(timefinal2,idupdate,timeupdate){

    var timedefinitive = timefinal2 + timeupdate;
    var sql4 = "UPDATE days SET time_total = "+timedefinitive+" WHERE id = "+idupdate;
    req.getConnection((err, conn) => {
        conn.query(sql4, (err, update) => {
                            
        
        })});
    
}     




req.getConnection((err, conn) => {
    conn.query('select * from days where time_total != 0', (err, rows) => {
       
        res.render('customer',{
            data: rows
        });

    })});

}

module.exports = controller;