//Function goes through the argument provided csv, maintaining variables to keep
//count of the number of bookings and the price per booking(to compute the average)
//if only updates the variables if they have value corresponding to two bedrooms
function manage_data(data){
    var SOUTHEAST=0, CENTRE=0, NORTHEAST=0, NORTHWEST=0, NORTH=0, SOUTH=0, EAST=0, WEST=0;
    var SOUTHEASTprice=0, CENTREprice=0, NORTHEASTprice=0, NORTHWESTprice=0, NORTHprice=0, SOUTHprice=0, EASTprice=0, WESTprice=0;
    for (var i = 0; i < data.length; i++){
        if (data[i].accommodates == 2) {
            if (data[i].borough == "SOUTHEAST" ){
                SOUTHEAST++;
                SOUTHEASTprice = SOUTHEASTprice +  parseFloat(data[i].price);
            }
            if (data[i].borough == "CENTRE" ){
                CENTRE++;
                CENTREprice += parseFloat(data[i].price);
            }
            if (data[i].borough == "NORTHEAST" ){
                NORTHEAST++;
                NORTHEASTprice += parseFloat(data[i].price);
            }
            if (data[i].borough == "NORTHWEST" ){
                NORTHWEST++;
                NORTHWESTprice += parseFloat(data[i].price);
            }
            if (data[i].borough == "NORTH" ){
                NORTH++;
                NORTHprice += parseFloat(data[i].price);
            }
            if (data[i].borough == "SOUTH" ){
                SOUTH++;
                SOUTHprice += parseFloat(data[i].price);
            }
            if (data[i].borough == "EAST" ){
                EAST++;
                EASTprice += parseFloat(data[i].price);
            }
            if (data[i].borough == "WEST" ){
                WEST++;
                WESTprice += parseFloat(data[i].price);
            }
        }
    }

    //computed data is hashed into a javascript object as to pass as argument to the graphing function
    dataset = {RECORDS : [{ name : "SOUTHEAST", value : SOUTHEAST, price : SOUTHEASTprice/SOUTHEAST},
            { name : "CENTRE", value : CENTRE, price : CENTREprice/CENTRE},
            { name : "NORTHEAST", value : NORTHEAST, price : NORTHEASTprice/NORTHEAST},
            { name : "NORTHWEST", value : NORTHWEST, price : NORTHWESTprice/NORTHWEST},
            { name : "NORTH", value : NORTH, price : NORTHprice/NORTH},
            { name : "SOUTH", value : SOUTH, price : SOUTHprice/SOUTH},
            { name : "EAST", value : EAST, price : EASTprice/EAST},
            { name : "WEST", value : WEST, price : WESTprice/WEST}
        ], SUMS:[{sumBookings : SOUTHEAST+CENTRE+NORTHEAST+NORTHWEST+NORTH+SOUTH+EAST+WEST},
            {sumPrice: (SOUTHEASTprice/SOUTHEAST+CENTREprice/CENTRE+NORTHEASTprice/NORTHEAST+NORTHWESTprice/NORTHWEST
                    +NORTHprice/NORTH+SOUTHprice/SOUTH+EASTprice/EAST+WESTprice/WEST)/8}]};

    //graphing function
    generateVisualization(dataset);
}