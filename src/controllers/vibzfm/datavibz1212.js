export const createvibzfmUser = async (req, res) => {
    try {
      const token = req.headers["x-token"];
      const decoded = jwt.verify(token, "the-super-strong-secrect");
      console.log(req.body, "dfdsf");
  
      const existingUser = await Vidzfm.findOne({
        where: {
          [Op.or]: [
            { email: req.body.email }, // Check if name already exists
            { phone: req.body.phone }, // Check if phone already exists
          ],
        },
      });
  
      console.log(existingUser, "1235");
  
      if (req.body.user_type == "addNew") {
        if (existingUser) {
          return successResponse2(req, res, existingUser);
        }
  
        const myresult = await customer_table.create({
          name: req.body.name,
          mobile: req.body.phone,
          email: req.body.email,
        });
  
        const result = await Vidzfm.create({
          sales_rep: req.body.sales_rep,
          advertiser: req.body.advertiser,
          name: req.body.name,
          event: req.body.event,
          phone: req.body.phone,
          email: req.body.email,
          orderid: req.body.orderid,
          sign: req.body.sign,
          fields: req.body.fields,
          generetedBy: decoded.userss.id,
          Role: decoded.userss.role,
          paymentdue: req.body.paymentdue,
          customerid: req.body.customerid,
          cost: req.body.cost,
          trade: req.body.trade,
          discountabst: req.body.discountabst,
          abst: req.body.abst,
          grandtotal: req.body.grandtotal,
          signature: decoded.userss.signature,
          discountdropdown: req.body.discountdropdown,
          monthlydistribute: req.body.monthlydistribute,
        });
        console.log(result, "ddds2123");
  
        if (result.id) {
          var productitem = req.body.fields[0];
          for (let i = 0; i < productitem.length; i++) {
            // console.log(result.id, "hhhh");
            console.log(productitem.length, "loop");
            await Invoice.create({
              product_type: productitem[i].product_type,
              start_date: productitem[i].start_date,
              end_date: productitem[i].end_date,
              starttime: productitem[i].starttime,
              endtime: productitem[i].endtime,
              sunday: productitem[i].sunday,
              monday: productitem[i].monday,
              tuesday: productitem[i].tuesday,
              wednesday: productitem[i].wednesday,
              thursday: productitem[i].thursday,
              friday: productitem[i].friday,
              saturday: productitem[i].saturday,
              rate: productitem[i].rate,
              discount: productitem[i].discount,
              cost: productitem[i].cost,
              discounted_cost: productitem[i].discounted_cost,
              cost_tax: productitem[i].cost_tax,
              total: productitem[i].total,
              formid: result.id,
              createdAt: req.body.contract_date,
              updatedAt: req.body.contract_date,
              weekhr: req.body.weekhr,
              qty: productitem[i].qty,
              jan: productitem[i].jan,
              feb: productitem[i].feb,
              mar: productitem[i].mar,
              april: productitem[i].april,
              may: productitem[i].may,
              june: productitem[i].june,
              july: productitem[i].july,
              aug: productitem[i].aug,
              sept: productitem[i].sept,
              oct: productitem[i].oct,
              nov: productitem[i].nov,
              dec: productitem[i].dec,
            });
          }
        }
  
        return successResponse1(req, res, result, myresult);
      } else {
        const myresult = await Vidzfm.create({
          sales_rep: req.body.sales_rep,
          advertiser: req.body.advertiser,
          name: req.body.name,
          event: req.body.event,
          phone: req.body.phone,
          email: req.body.email,
          orderid: req.body.orderid,
          sign: req.body.sign,
          fields: req.body.fields,
          generetedBy: decoded.userss.id,
          Role: decoded.userss.role,
          paymentdue: req.body.paymentdue,
          customerid: req.body.customerid,
          cost: req.body.cost,
          trade: req.body.trade,
          discountabst: req.body.discountabst,
          abst: req.body.abst,
          grandtotal: req.body.grandtotal,
          signature: decoded.userss.signature,
          discountdropdown: req.body.discountdropdown,
          monthlydistribute: req.body.monthlydistribute,
        });
  
        console.log(myresult, "78952");
        if (myresult.id) {
          var productitem = req.body.fields[0];
          console.log(productitem, "productitem");
          for (let i = 0; i < productitem.length; i++) {
            console.log(existingUser, "hhhh");
            console.log(myresult, "resultid");
            console.log(productitem.length, "loopingvvfnbnvnvnh");
            await Invoice.create({
              product_type: productitem[i].product_type,
              start_date: productitem[i].start_date,
              end_date: productitem[i].end_date,
              starttime: productitem[i].starttime,
              endtime: productitem[i].endtime,
              sunday: productitem[i].sunday,
              monday: productitem[i].monday,
              tuesday: productitem[i].tuesday,
              wednesday: productitem[i].wednesday,
              thursday: productitem[i].thursday,
              friday: productitem[i].friday,
              saturday: productitem[i].saturday,
              rate: productitem[i].rate,
              discount: productitem[i].discount,
              cost: productitem[i].cost,
              discounted_cost: productitem[i].discounted_cost,
              cost_tax: productitem[i].cost_tax,
              total: productitem[i].total,
              formid: myresult.id,
              createdAt: req.body.contract_date,
              updatedAt: req.body.contract_date,
              weekhr: req.body.weekhr,
              qty: productitem[i].qty,
              jan: productitem[i].jan,
              feb: productitem[i].feb,
              mar: productitem[i].mar,
              april: productitem[i].april,
              may: productitem[i].may,
              june: productitem[i].june,
              july: productitem[i].july,
              aug: productitem[i].aug,
              sept: productitem[i].sept,
              oct: productitem[i].oct,
              nov: productitem[i].nov,
              dec: productitem[i].dec,
            });
            console.log(myresult, "myresult");
          }
        }
  
        const users = await user.findByPk(req.body.selectedsalesdropdownid);
  
  
        var userId = myresult.id;
  
                      Vidzfm.update(
                      {generetedBy: req.body.selectedsalesdropdownid,
                        Role:3,
                        signature:users.signature,
                      },
                      { where: { id: userId } }
                    );
  
                
  
  console.log(req.body.selectedsalesdropdownid,'sdfsdfsdfsdfsddsds')
       
       
        ////////////////////////////////////////////////////////////////////
  
     
  
        const invoicedetails = await Vidzfm.findOne({ where: { id: userId } });
        const productTypes = invoicedetails.fields[0].map(
          (item) => item.product_type
        );
  
        const uniqueProductTypesSet = new Set(productTypes);
  
        // Convert the Set back to an array
        const uniqueProductTypes = [...uniqueProductTypesSet];
  
        console.log(uniqueProductTypes, "sdsd");
  
       let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `https://api.clickup.com/api/v2/list/${process.env.list_id}/field`,
          headers: { 
            'Content-Type': 'application/json', 
            'Authorization': '50650538_58004adf71661b70cf25f63a0ef724e3a0e4c90d251b657840456cafbfcd2dcc'
          }
        };
        
        axios.request(config)
        .then((response) => {
        
          const fields = response.data.fields;
  
          // Find the "Product(s)/Package(s)" field
          const productPackageField = fields.find(field => field.name === "Product(s)/Package(s)");
      
        
            // Extract the options from the "Product(s)/Package(s)" field
            var options = productPackageField.type_config.options;
      
               
        console.log(options,'fsdfd');
           
      
        var labelIds = [];
  
        options.forEach((option) => {
          if (uniqueProductTypes.includes(option.label)) {
            labelIds.push(option.id.toString());
          }
        });
  
        var splitLabelIds = labelIds.join(",").split(",");
  
        console.log(splitLabelIds, "labelIDs");
  
        if (invoicedetails) {
          const currentDated = invoicedetails.createdAt;
          const currentDate = moment(invoicedetails.createdAt);
  
          const futureDate = currentDate.add(30, "days");
  
          console.log(invoicedetails.createdAt, "xyzsd");
  
          console.log(futureDate, "sddsdsdsd4252");
          console.log(currentDated, "currentdate");
          const unixTimestampMilliseconds = futureDate.valueOf(); // Convert to seconds
          const startdate = currentDated.valueOf(); // Convert to seconds
  
          console.log(unixTimestampMilliseconds, "xyz5123");
          console.log(startdate, "xyz51234");
  
          let datapayload = JSON.stringify({
            name: `${invoicedetails.advertiser}`,
            description: "",
            assignees: [],
            tags: ["tag name"],
  
            status: "open",
  
            priority: 2,
            due_date: `${unixTimestampMilliseconds}`,
            due_date_time: false,
            time_estimate: 8640000,
            start_date: `${startdate}`,
            start_date_time: false,
            notify_all: true,
            parent: null,
            links_to: null,
            check_required_custom_fields: "false",
            custom_fields: [
              {
                id: "88d9a91e-7acf-4ad0-bdf5-f5527f9b2082",
                name: "Est. Value (ABST Excl.)",
                value: `${invoicedetails.cost}`,
              },
              {
                id: "58b6e7e9-491a-4293-badd-93f9ccbdca7e",
                name: "Product(s)/Package(s)",
                type: "labels",
  
           
                value: splitLabelIds,
              },
            ],
          });
  
          const myuserId = decoded.userss.id;
  
          user.findByPk(myuserId).then((user) => {
            var myaccess_token = user.access_token;
            console.log(myaccess_token, "access_TOKE");
  
            let config = {
              method: "post",
              maxBodyLength: Infinity,
              url: `https://api.clickup.com/api/v2/list/${process.env.list_id}/task?custom_task_ids=true&team_id=${process.env.team_id}`,
              headers: {
                "Content-Type": "application/json",
                Authorization: `${myaccess_token}`,
              },
              data: datapayload,
            };
            console.log(datapayload, "5152");
            axios
              .request(config)
              .then((response) => {
                var task_id = response.data.id;
                console.log(decoded.userss.access_token, "555865");
                console.log(JSON.stringify(response.data.id, "555"));
  
                console.log(userId, "userid");
  
                upload.single("pdf")(req, res, async (err) => {
                  if (err) {
                    // Handle any Multer errors
                    return res.status(500).json({ error: err.message });
                  }
  
                  const users = await Vidzfm.findOne({ where: { id: userId } });
                  const myproductitem = await Invoice.findAll({
                    where: { formid: userId },
                  });
                  const sums = await Invoice.findOne({
                    attributes: [
                      [sequelize.fn("SUM", sequelize.col("jan")), "jan"],
                      [sequelize.fn("SUM", sequelize.col("feb")), "feb"],
                      [sequelize.fn("SUM", sequelize.col("mar")), "mar"],
                      [sequelize.fn("SUM", sequelize.col("april")), "april"],
                      [sequelize.fn("SUM", sequelize.col("may")), "may"],
                      [sequelize.fn("SUM", sequelize.col("june")), "june"],
                      [sequelize.fn("SUM", sequelize.col("july")), "july"],
                      [sequelize.fn("SUM", sequelize.col("aug")), "aug"],
                      [sequelize.fn("SUM", sequelize.col("sept")), "sept"],
                      [sequelize.fn("SUM", sequelize.col("oct")), "oct"],
                      [sequelize.fn("SUM", sequelize.col("nov")), "nov"],
                      [sequelize.fn("SUM", sequelize.col("dec")), "dec"],
                    ],
                    where: {
                      formid: userId,
                    },
                  });
  
                  const minStartDate = await Invoice.min("start_date", {
                    where: { formid: userId },
                  });
                  const maxEndDate = await Invoice.max("end_date", {
                    where: { formid: userId },
                  });
  
                  console.log(users.email, "email123");
  
                  if (!users) {
                    return res
                      .status(404)
                      .send({ message: `User with id ${userId} not found` });
                  } else {
                    var title = "Quotation";
                    var maintitle = "Quotation";
  
                    const pdfresponse = generatePDF(
                      users,
                      myproductitem,
                      sums,
                      minStartDate,
                      maxEndDate,
                      title,
                      maintitle
                    );
  
                    console.log(task_id, "task_id789");
                    const updatedresponse = await Vidzfm.update(
                      { pdf: pdfresponse, task_id: task_id },
                      { where: { id: userId } }
                    );
  
                    console.log(updatedresponse, "updatedresponse");
                    console.log(pdfresponse, "pdfresponse");
                    console.log(users.pdf, "users.pdf1");
                    console.log(users.contractdate, "1date3");
  
                    let payload = new FormData();
                    payload.append(
                      "attachment",
                      fs.createReadStream(`${pdfresponse}`)
                    );
  
                    let config = {
                      method: "post",
                      maxBodyLength: Infinity,
                      url: `https://api.clickup.com/api/v2/task/${task_id}/attachment?team_id=${process.env.team_id}&custom_task_ids=true`,
                      headers: {
                        Authorization: `${myaccess_token}`,
                        ...payload.getHeaders(),
                      },
                      data: payload,
                    };
  
                    axios
                      .request(config)
                      .then((response) => {
                        console.log(JSON.stringify(response.data), "findpdf");
                      })
                      .catch((error) => {
                        console.log(error, "dfc");
                      });
                  }
                });
  
                return successResponse1(req, res, { myresult });
              })
              .catch((error) => {
                if (error.response.status == 401) {
                  return successResponse(req, res, {}, false, 401);
                }
              });
          });
          // }
        }
      })
      }
      
    } catch (err) {
      console.log(err123);
  
      return res.status(500).json({ message: "Internal server error", err: err });
    }
  };