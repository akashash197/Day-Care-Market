var mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const md5 = require('md5');


var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ecomm"
});

conn.connect(function(err) {
  if (err) throw err;
  console.log("Connected to database ecomm!");
});

  
const app = express();
const port = 8000; // You can use any port number you prefer

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


//Api for Admin Login
app.get('/adminlogin', (req, res) => {
  const { loginArr } = req.query;

  if (loginArr && loginArr !== '') {
    const loginArrObj = JSON.parse(loginArr);
    const username = loginArrObj.userName;
    const password = md5(loginArrObj.userPassword);
    const login_query = `select * from tbl_user where email='${username}' and password='${password}' and user_role=1`;

    conn.query(login_query, (err, login_data) => {
      if (err) {
        console.error(err);
        return res.json({ status: false, msg: 'Error fetching data!' });
      }

      const final_arr = [];
      let cnt = 0;

      if (login_data.length > 0) {
        login_data.forEach((row) => {
          final_arr[cnt] = {
            id: row.id,
            username: row.email,
            first_name: row.first_name,
            last_name: row.last_name,
          };
          cnt++;
        });
      }

      return res.json({ status: true, msg: 'Login Data!', data: final_arr });
    });
  } else {
    return res.json({ status: false, msg: 'Invalid Parameter' });
  }
});


// API for country list
app.get('/country_list', (req, res) => {
  const country_query = 'SELECT * FROM tbl_country';
  conn.query(country_query, (error, results) => {
    if (error) {
      console.error('Error executing the country query: ' + error.stack);
      return res.json({ status: 0, msg: 'Error retrieving country list', data: [] });
    }
    const final_arr = results.map((row) => ({
      id: row.id,
      name: row.name,
    }));
    res.json({ status: 1, msg: 'Country List', data: final_arr });
  });
});



// API for country add
 
app.post('/countryAdd', (req, res) => {
  const postData = req.body;
  if (postData.countryName && postData.countryName.trim() !== '') {
      const name = postData.countryName;
      const today_date = new Date().toISOString().slice(0, 10);
      const userquery = `INSERT INTO tbl_country(name, created_on, updated_on) VALUES('${name}', '${today_date}', '${today_date}')`;

      conn.query(userquery, (error, results) => {
          if (error) {
              console.error('Error executing the country add query: ' + error.stack);
              return res.json({ status: 0, msg: 'Error adding country', data: [] });
          }
          res.json({ status: 1, msg: 'Successful.' });
      });
  } else {
      res.json({ status: 0, msg: "Invalid Parameter" });
  }
});

// API for country edit
 
app.post('/countryEdit', (req, res) => {
  const postData = req.body;
  if (postData && postData !== '') {
      const name = postData.countryName;
      const country_id = postData.id;
      const today_date = new Date().toISOString().slice(0, 10);

      //const userquery = `INSERT INTO tbl_country(name, created_on, updated_on) VALUES('${name}', '${today_date}', '${today_date}')`;

      const userquery = `update tbl_country set name='${name}',updated_on='${today_date}' where id='${country_id}'`;

      conn.query(userquery, (error, results) => {
          if (error) {
              console.error('Error executing the country edit query: ' + error.stack);
              return res.json({ status: 0, msg: 'Error updating country', data: [] });
          }
          res.json({ status: 1, msg: 'Successful.' });
      });
  } else {
      res.json({ status: 0, msg: "Invalid Parameter" });
  }
});


// API for country delete
 
app.post('/countryDelete', (req, res) => {
  const postData = req.body;
  if (postData && postData !== '') {
      const country_id = postData.id;

      const delete_query = `delete from tbl_country where id='${country_id}'`;

      conn.query(delete_query, (error, results) => {
          if (error) {
              console.error('Error executing the country delete query: ' + error.stack);
              return res.json({ status: 0, msg: 'Error deleting country', data: [] });
          }
          res.json({ status: 1, msg: 'Successful.' });
      });
  } else {
      res.json({ status: 0, msg: "Invalid Parameter" });
  }
});


// API for state list
app.get('/state_list', (req, res) => {
  const state_query = "select tbl_state.*,tbl_country.name as country_name from tbl_state join tbl_country on tbl_state.country_id=tbl_country.id";
  conn.query(state_query, (error, results) => {
    if (error) {
      console.error('Error executing the State query: ' + error.stack);
      return res.json({ status: 0, msg: 'Error retrieving state list', data: [] });
    }
    const final_arr = results.map((row) => ({
      id: row.id,
      name: row.name,
      country_name: row.country_name
    }));
    res.json({ status: 1, msg: 'State List', data: final_arr });
  });
});


// API for state add
 
app.post('/stateAdd', (req, res) => {
  const postData = req.body;
  if (postData && postData !== '') {
      const name = postData.stateName;
      const country_id = postData.countryId;
      const today_date = new Date().toISOString().slice(0, 10);
      const userquery = `INSERT INTO tbl_state(name, country_id, created_on, updated_on) VALUES('${name}', '${country_id}', '${today_date}', '${today_date}')`;

      conn.query(userquery, (error, results) => {
          if (error) {
              console.error('Error executing the state add query: ' + error.stack);
              return res.json({ status: 0, msg: 'Error adding state', data: [] });
          }
          res.json({ status: 1, msg: 'Successful.' });
      });
  } else {
      res.json({ status: 0, msg: "Invalid Parameter" });
  }
});

// API for state edit

app.post('/stateEdit', (req, res) => {
  const postData = req.body;
  if (postData && postData !== '') {
      const name = postData.stateName;
      const country_id = postData.countryId;
      const state_id = postData.id; 

      const today_date = new Date().toISOString().slice(0, 10);
      const userquery = `update tbl_state set name='${name}', country_id='${country_id}}', updated_on='${today_date}' where id='${state_id}'`;

      conn.query(userquery, (error, results) => {
          if (error) {
              console.error('Error executing the state edit query: ' + error.stack);
              return res.json({ status: 0, msg: 'Error updating state', data: [] });
          }
          res.json({ status: 1, msg: 'Successful.' });
      });
  } else {
      res.json({ status: 0, msg: "Invalid Parameter" });
  }
});


// API for state delete
 
app.post('/stateDelete', (req, res) => {
  const postData = req.body;
  if (postData && postData !== '') {
      const state_id = postData.id;

      const delete_query = `delete from tbl_state where id='${state_id}'`;

      conn.query(delete_query, (error, results) => {
          if (error) {
              console.error('Error executing the state delete query: ' + error.stack);
              return res.json({ status: 0, msg: 'Error deleting state', data: [] });
          }
          res.json({ status: 1, msg: 'Successful.' });
      });
  } else {
      res.json({ status: 0, msg: "Invalid Parameter" });
  }
});


// API for city list
app.get('/city_list', (req, res) => {
  const city_query = "select tbl_city.*,tbl_country.name as country_name,tbl_state.name as state_name from tbl_city join tbl_state on tbl_city.state_id=tbl_state.id join tbl_country on tbl_city.country_id=tbl_country.id;";
  conn.query(city_query, (error, results) => {
    if (error) {
      console.error('Error executing the City query: ' + error.stack);
      return res.json({ status: 0, msg: 'Error retrieving city list', data: [] });
    }
    const final_arr = results.map((row) => ({
      id: row.id,
      name: row.name,
      country_name: row.country_name,
      state_name: row.state_name
    }));
    res.json({ status: 1, msg: 'City List', data: final_arr });
  });
});


// API for city add
 
app.post('/cityAdd', (req, res) => {
  const postData = req.body;
  if (postData && postData !== '') {
      const name = postData.cityName;
      const country_id = postData.countryId;
      const state_id = postData.stateId;
      const today_date = new Date().toISOString().slice(0, 10);
      const userquery = `INSERT INTO tbl_city(name, country_id, state_id, created_on, updated_on) VALUES('${name}', '${country_id}', '${state_id}', '${today_date}', '${today_date}')`;

      conn.query(userquery, (error, results) => {
          if (error) {
              console.error('Error executing the city add query: ' + error.stack);
              return res.json({ status: 0, msg: 'Error adding city', data: [] });
          }
          res.json({ status: 1, msg: 'Successful.' });
      });
  } else {
      res.json({ status: 0, msg: "Invalid Parameter" });
  }
});


// API for city edit
 
app.post('/cityEdit', (req, res) => {
  const postData = req.body;
  if (postData && postData !== '') {
      const name = postData.cityName;
      const country_id = postData.countryId;
      const state_id = postData.stateId;
      const city_id = postData.id;
      const today_date = new Date().toISOString().slice(0, 10);
      const userquery = `update tbl_city set name='${name}', country_id='${country_id}', state_id='${state_id}', updated_on='${today_date}' where id='${city_id}'`;

      conn.query(userquery, (error, results) => {
          if (error) {
              console.error('Error executing the city edit query: ' + error.stack);
              return res.json({ status: 0, msg: 'Error updating city', data: [] });
          }
          res.json({ status: 1, msg: 'Successful.' });
      });
  } else {
      res.json({ status: 0, msg: "Invalid Parameter" });
  }
});


// API for city delete
 
app.post('/cityDelete', (req, res) => {
  const postData = req.body;
  if (postData && postData !== '') {
      const city_id = postData.id;

      const delete_query = `delete from tbl_city where id='${city_id}'`;

      conn.query(delete_query, (error, results) => {
          if (error) {
              console.error('Error executing the city delete query: ' + error.stack);
              return res.json({ status: 0, msg: 'Error deleting city', data: [] });
          }
          res.json({ status: 1, msg: 'Successful.' });
      });
  } else {
      res.json({ status: 0, msg: "Invalid Parameter" });
  }
});


// API for location list
app.get('/location_list', (req, res) => {
  const location_query = "select tbl_location.*,tbl_country.name as country_name,tbl_state.name as state_name,tbl_city.name as city_name from tbl_location join tbl_state on tbl_location.state_id=tbl_state.id join tbl_country on tbl_location.country_id=tbl_country.id join tbl_city on tbl_location.city_id=tbl_city.id;";
  conn.query(location_query, (error, results) => {
    if (error) {
      console.error('Error executing the Location query: ' + error.stack);
      return res.json({ status: 0, msg: 'Error retrieving location list', data: [] });
    }
    const final_arr = results.map((row) => ({
      id: row.id,
      name: row.name,
      country_name: row.country_name,
      state_name: row.state_name,
      city_name: row.city_name
    }));
    res.json({ status: 1, msg: 'Location List', data: final_arr });
  });
});


// API for location add
 
app.post('/locationAdd', (req, res) => {
  const postData = req.body;
  if (postData && postData !== '') {
      const name = postData.locationName;
      const country_id = postData.countryId;
      const state_id = postData.stateId;
      const city_id = postData.cityId;
      const today_date = new Date().toISOString().slice(0, 10);
      const userquery = `INSERT INTO tbl_location(name, country_id, state_id, city_id, created_on, updated_on) VALUES('${name}', '${country_id}', '${state_id}', '${city_id}', '${today_date}', '${today_date}')`;

      conn.query(userquery, (error, results) => {
          if (error) {
              console.error('Error executing the location add query: ' + error.stack);
              return res.json({ status: 0, msg: 'Error adding location', data: [] });
          }
          res.json({ status: 1, msg: 'Successful.' });
      });
  } else {
      res.json({ status: 0, msg: "Invalid Parameter" });
  }
});


// API for location edit
 
app.post('/locationEdit', (req, res) => {
  const postData = req.body;
  if (postData && postData !== '') {
      const name = postData.locationName;
      const country_id = postData.countryId;
      const state_id = postData.stateId;
      const city_id = postData.cityId;
      const location_id = postData.id;
      const today_date = new Date().toISOString().slice(0, 10);
      const userquery = `update tbl_location set name='${name}', country_id='${country_id}', state_id='${state_id}', city_id='${city_id}', updated_on='${today_date}' where id='${location_id}'`;

      conn.query(userquery, (error, results) => {
          if (error) {
              console.error('Error executing the location add query: ' + error.stack);
              return res.json({ status: 0, msg: 'Error adding location', data: [] });
          }
          res.json({ status: 1, msg: 'Successful.' });
      });
  } else {
      res.json({ status: 0, msg: "Invalid Parameter" });
  }
});


// API for location delete
 
app.post('/locationDelete', (req, res) => {
  const postData = req.body;
  if (postData && postData !== '') {
      const location_id = postData.id;

      const delete_query = `delete from tbl_location where id='${location_id}'`;

      conn.query(delete_query, (error, results) => {
          if (error) {
              console.error('Error executing the location delete query: ' + error.stack);
              return res.json({ status: 0, msg: 'Error deleting location', data: [] });
          }
          res.json({ status: 1, msg: 'Successful.' });
      });
  } else {
      res.json({ status: 0, msg: "Invalid Parameter" });
  }
});


// API for category list

app.get('/category_list', (req, res) => {
  const category_query = 'select * from tbl_category';
  conn.query(category_query, (error, results) => {
    if (error) {
      console.error('Error executing the category query: ' + error.stack);
      return res.json({ status: 0, msg: 'Error retrieving category list', data: [] });
    }
    const final_arr = results.map((row) => ({
      id: row.id,
      name: row.name,
    }));
    res.json({ status: 1, msg: 'Category List', data: final_arr });
  });
});


// API for category add
 
app.post('/categoryAdd', (req, res) => {
  const postData = req.body;
  if (postData && postData !== '') {
      const name = postData.categoryName;
      const today_date = new Date().toISOString().slice(0, 10);
      const userquery = `INSERT INTO tbl_category(name, created_on, updated_on) VALUES('${name}', '${today_date}', '${today_date}')`;

      conn.query(userquery, (error, results) => {
          if (error) {
              console.error('Error executing the category add query: ' + error.stack);
              return res.json({ status: 0, msg: 'Error adding category', data: [] });
          }
          res.json({ status: 1, msg: 'Successful.' });
      });
  } else {
      res.json({ status: 0, msg: "Invalid Parameter" });
  }
});


// API for category edit
 
app.post('/categoryEdit', (req, res) => {
  const postData = req.body;
  if (postData && postData !== '') {
      const name = postData.categoryName;
      const category_id = postData.id;
      const today_date = new Date().toISOString().slice(0, 10);
      const userquery = `update tbl_category set name='${name}',updated_on='${today_date}' where id='${category_id}'`;

      conn.query(userquery, (error, results) => {
          if (error) {
              console.error('Error executing the category edit query: ' + error.stack);
              return res.json({ status: 0, msg: 'Error updation category', data: [] });
          }
          res.json({ status: 1, msg: 'Successful.' });
      });
  } else {
      res.json({ status: 0, msg: "Invalid Parameter" });
  }
});


// API for category delete
 
app.post('/categoryDelete', (req, res) => {
  const postData = req.body;
  if (postData && postData !== '') {
      const category_id = postData.id;

      const delete_query = `delete from tbl_category where id='${category_id}'`;

      conn.query(delete_query, (error, results) => {
          if (error) {
              console.error('Error executing the category delete query: ' + error.stack);
              return res.json({ status: 0, msg: 'Error deleting category', data: [] });
          }
          res.json({ status: 1, msg: 'Successful.' });
      });
  } else {
      res.json({ status: 0, msg: "Invalid Parameter" });
  }
});


// API for brand list

app.get('/brand_list', (req, res) => {
  const brand_query = 'select * from tbl_brand';
  conn.query(brand_query, (error, results) => {
    if (error) {
      console.error('Error executing the brand query: ' + error.stack);
      return res.json({ status: 0, msg: 'Error retrieving brand list', data: [] });
    }
    const final_arr = results.map((row) => ({
      id: row.id,
      name: row.name,
    }));
    res.json({ status: 1, msg: 'Brand List', data: final_arr });
  });
});


// API for brand add
 
app.post('/brandAdd', (req, res) => {
  const postData = req.body;
  if (postData && postData !== '') {
      const name = postData.brandName;
      const today_date = new Date().toISOString().slice(0, 10);
      const userquery = `INSERT INTO tbl_brand(name, created_on, updated_on) VALUES('${name}', '${today_date}', '${today_date}')`;

      conn.query(userquery, (error, results) => {
          if (error) {
              console.error('Error executing the brand add query: ' + error.stack);
              return res.json({ status: 0, msg: 'Error adding brand', data: [] });
          }
          res.json({ status: 1, msg: 'Successful.' });
      });
  } else {
      res.json({ status: 0, msg: "Invalid Parameter" });
  }
});


// API for brand edit
 
app.post('/brandEdit', (req, res) => {
  const postData = req.body;
  if (postData && postData !== '') {
      const name = postData.brandName;
      const brand_id = postData.id;
      const today_date = new Date().toISOString().slice(0, 10);
      const userquery = `update tbl_brand set name='${name}',updated_on='${today_date}' where id='${brand_id}'`;

      conn.query(userquery, (error, results) => {
          if (error) {
              console.error('Error executing the brand edit query: ' + error.stack);
              return res.json({ status: 0, msg: 'Error updating brand', data: [] });
          }
          res.json({ status: 1, msg: 'Successful.' });
      });
  } else {
      res.json({ status: 0, msg: "Invalid Parameter" });
  }
});


// API for brand delete
 
app.post('/brandDelete', (req, res) => {
  const postData = req.body;
  if (postData && postData !== '') {
      const brand_id = postData.id;

      const delete_query = `delete from tbl_brand where id='${brand_id}'`;

      conn.query(delete_query, (error, results) => {
          if (error) {
              console.error('Error executing the brand delete query: ' + error.stack);
              return res.json({ status: 0, msg: 'Error deleting brand', data: [] });
          }
          res.json({ status: 1, msg: 'Successful.' });
      });
  } else {
      res.json({ status: 0, msg: "Invalid Parameter" });
  }
});


// API for tax list

app.get('/tax_list', (req, res) => {
  const tax_query = 'select * from tbl_tax';
  conn.query(tax_query, (error, results) => {
    if (error) {
      console.error('Error executing the tax query: ' + error.stack);
      return res.json({ status: 0, msg: 'Error retrieving tax list', data: [] });
    }
    const final_arr = results.map((row) => ({
      id: row.id,
      name: row.name,
      slab: row.slab
    }));
    res.json({ status: 1, msg: 'Tax List', data: final_arr });
  });
});


// API for tax add
 
app.post('/taxAdd', (req, res) => {
  const postData = req.body;
  if (postData && postData !== '') {
      const name = postData.taxName;
      const slab = postData.slab;
      const today_date = new Date().toISOString().slice(0, 10);
      const userquery = `INSERT INTO tbl_tax(name, slab, created_on, updated_on) VALUES('${name}', '${slab}', '${today_date}', '${today_date}')`;

      conn.query(userquery, (error, results) => {
          if (error) {
              console.error('Error executing the tax add query: ' + error.stack);
              return res.json({ status: 0, msg: 'Error adding tax', data: [] });
          }
          res.json({ status: 1, msg: 'Successful.' });
      });
  } else {
      res.json({ status: 0, msg: "Invalid Parameter" });
  }
});


// API for tax edit
 
app.post('/taxEdit', (req, res) => {
  const postData = req.body;
  if (postData && postData !== '') {
      const name = postData.taxName;
      const slab = postData.slab;
      const tax_id = postData.id;
      const today_date = new Date().toISOString().slice(0, 10);
      const userquery = `update tbl_tax set name='${name}', slab='${slab}', updated_on='${today_date}' where id='${tax_id}'`;

      conn.query(userquery, (error, results) => {
          if (error) {
              console.error('Error executing the tax edit query: ' + error.stack);
              return res.json({ status: 0, msg: 'Error updating tax', data: [] });
          }
          res.json({ status: 1, msg: 'Successful.' });
      });
  } else {
      res.json({ status: 0, msg: "Invalid Parameter" });
  }
});


// API for tax delete
 
app.post('/taxDelete', (req, res) => {
  const postData = req.body;
  if (postData && postData !== '') {
      const tax_id = postData.id;

      const delete_query = `delete from tbl_tax where id='${tax_id}'`;

      conn.query(delete_query, (error, results) => {
          if (error) {
              console.error('Error executing the tax delete query: ' + error.stack);
              return res.json({ status: 0, msg: 'Error deleting tax', data: [] });
          }
          res.json({ status: 1, msg: 'Successful.' });
      });
  } else {
      res.json({ status: 0, msg: "Invalid Parameter" });
  }
});


// API for user list

app.get('/user_list', (req, res) => {
  const user_query = 'select * from tbl_user';
  conn.query(user_query, (error, results) => {
    if (error) {
      console.error('Error executing the user query: ' + error.stack);
      return res.json({ status: 0, msg: 'Error retrieving user list', data: [] });
    }
    const final_arr = results.map((row) => ({
      id: row.id,
      first_name: row.first_name,
      last_name: row.last_name,
      email: row.email,
      user_role: row.user_role
    }));
    res.json({ status: 1, msg: 'User List', data: final_arr });
  });
});



// API for user add
 
app.post('/userAdd', (req, res) => {
  const postData = req.body;
  if (postData && postData !== '') {
      const first_name = postData.firstName;
      const last_name = postData.lastName;
      const email = postData.email;
      const password = md5(postData.password);
      const user_role = postData.userRole;

      const today_date = new Date().toISOString().slice(0, 10);

      
      // Check if the email already exists in the database
      conn.query(`SELECT * FROM tbl_user WHERE email='${email}'`, (error, results) => {

        if (error) {
          console.error('Error executing the email check query: ' + error.stack);
          return res.json({ status: 0, msg: 'Error checking email', data: [] });
        }

        if (results.length > 0) {
          return res.json({ status: 0, msg: 'Email Already Exist' });
        }

        else {
          const userquery = `INSERT INTO tbl_user(first_name, last_name, email, password, user_role, created_on, updated_on) VALUES('${first_name}', '${last_name}', '${email}', '${password}', '${user_role}', '${today_date}', '${today_date}')`;
          conn.query(userquery, (error, results) => {
          if (error) {
              console.error('Error executing the user add query: ' + error.stack);
              return res.json({ status: 0, msg: 'Error adding user', data: [] });
          }
          res.json({ status: 1, msg: 'Successful.' });
          });
        }

      });


  } else {
      res.json({ status: 0, msg: "Invalid Parameter" });
  }
});



// API for user edit
 
app.post('/userEdit', (req, res) => {
  const postData = req.body;
  if (postData && postData !== '') {
    const first_name = postData.firstName;
    const last_name = postData.lastName;
    const email = postData.email;
    const user_role = postData.userRole;

    const user_id = postData.id;


      const today_date = new Date().toISOString().slice(0, 10);
      const userquery = `update tbl_user set first_name='${first_name}', last_name='${last_name}', email='${email}', user_role='${user_role}', updated_on='${today_date}' where id='${user_id}'`;

      conn.query(userquery, (error, results) => {
          if (error) {
              console.error('Error executing the user edit query: ' + error.stack);
              return res.json({ status: 0, msg: 'Error updating user', data: [] });
          }
          res.json({ status: 1, msg: 'Successful.' });
      });
  } else {
      res.json({ status: 0, msg: "Invalid Parameter" });
  }
});



// API for user edit password
 
app.post('/userEditPass', (req, res) => {
  const postData = req.body;
  if (postData && postData !== '') {
    const password = md5(postData.password);
    const user_id = postData.id;


      const today_date = new Date().toISOString().slice(0, 10);
      const userquery = `update tbl_user set password='${password}', updated_on='${today_date}' where id='${user_id}'`;

      conn.query(userquery, (error, results) => {
          if (error) {
              console.error('Error executing the user password edit query: ' + error.stack);
              return res.json({ status: 0, msg: 'Error updating user password', data: [] });
          }
          res.json({ status: 1, msg: 'Successful.' });
      });
  } else {
      res.json({ status: 0, msg: "Invalid Parameter" });
  }
});


// API for user delete
 
app.post('/userDelete', (req, res) => {
  const postData = req.body;
  if (postData && postData !== '') {
      const user_id = postData.id;

      const delete_query = `delete from tbl_user where id='${user_id}'`;

      conn.query(delete_query, (error, results) => {
          if (error) {
              console.error('Error executing the user delete query: ' + error.stack);
              return res.json({ status: 0, msg: 'Error deleting user', data: [] });
          }
          res.json({ status: 1, msg: 'Successful.' });
      });
  } else {
      res.json({ status: 0, msg: "Invalid Parameter" });
  }
});



// API for user register
 
app.post('/userRegister', (req, res) => {
  const postData = req.body;
  if (postData && postData !== '') {
      const first_name = postData.firstName;
      const last_name = postData.lastName;
      const email = postData.email;
      const password = md5(postData.password);

      const today_date = new Date().toISOString().slice(0, 10);

      
      // Check if the email already exists in the database
      conn.query(`SELECT * FROM tbl_user WHERE email='${email}'`, (error, results) => {

        if (error) {
          console.error('Error executing the email check query: ' + error.stack);
          return res.json({ status: 0, msg: 'Error checking email', data: [] });
        }

        if (results.length > 0) {
          return res.json({ status: 0, msg: 'Email Already Exist' });
        }

        else {
          const userquery = `INSERT INTO tbl_user(first_name, last_name, email, password, created_on, updated_on) VALUES('${first_name}', '${last_name}', '${email}', '${password}', '${today_date}', '${today_date}')`;
          conn.query(userquery, (error, results) => {
          if (error) {
              console.error('Error executing the user add query: ' + error.stack);
              return res.json({ status: 0, msg: 'Error adding user', data: [] });
          }
          res.json({ status: 1, msg: 'Successful.' });
          });
        }

      });


  } else {
      res.json({ status: 0, msg: "Invalid Parameter" });
  }
});












// Dropdown Api

// API for State List in dropdown
app.get('/state_droplist', (req, res) => {
    const country_id = req.query.country_id;

    if (country_id && country_id !== '') {
      const state_query = `SELECT * FROM tbl_state WHERE country_id='${country_id}'`;
      conn.query(state_query, (error, state_data) => {
        if (error) {
          console.error('Error executing the state query: ' + error.stack);
          return res.json({ status: 0, msg: 'Error retrieving state list', data: [] });
        }
        const final_arr = state_data.map(row => ({
          id: row.id,
          name: row.name
        }));
        res.json({ status: 1, msg: 'State List', data: final_arr });
      });
    } else {
      res.json({ status: 0, msg: 'Invalid Parameter' });
    }

});

// API for City List in dropdown
app.get('/city_droplist', (req, res) => {
  const state_id = req.query.state_id;

  if (state_id && state_id !== '') {
    const city_query = `SELECT * FROM tbl_city WHERE state_id='${state_id}'`;
    conn.query(city_query, (error, city_data) => {
      if (error) {
        console.error('Error executing the city query: ' + error.stack);
        return res.json({ status: 0, msg: 'Error retrieving city list', data: [] });
      }
      const final_arr = city_data.map(row => ({
        id: row.id,
        name: row.name
      }));
      res.json({ status: 1, msg: 'City List', data: final_arr });
    });
  } else {
    res.json({ status: 0, msg: 'Invalid Parameter' });
  }

});




app.listen(port, () => {
    console.log(`API server listening at http://localhost:${port}`);
  });