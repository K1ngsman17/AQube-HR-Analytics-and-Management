// displays all employee info
function getAllData() {
    var xmlhtttp = new XMLHttpRequest();
    var url = "empAllInfo.php";
    xmlhtttp.open("GET", url, true);
    xmlhtttp.send();
    xmlhtttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            console.log(data);
            // destroy existing DataTable instance
            if ($.fn.DataTable.isDataTable('#dataTable')) {
                $('#dataTable').DataTable().destroy();
            }
            $('#dataTable').DataTable({
                // use retrieved data as the source for DataTable
                "data": data,
                columns: [
                    {
                        // display full name by combining first and last name fields
                        data: 'first_name',
                        render: function (data, type, row, meta) {
                            return row.first_name + ' ' + row.last_name;
                        }
                    },
                    { data: 'job_title' },
                    { data: 'name' },
                    { data: 'age' },
                    { data: 'doj' },
                    { data: 'city' },
                    { data: 'net_salary' }
                ],
            });
        }
    }
}

// displays newly added/joined employees
function getNewData() {
    console.log("in new data fn");
    var xmlhtttp = new XMLHttpRequest();
    var url = "empNewInfo.php";
    xmlhtttp.open("GET", url, true);
    xmlhtttp.send();
    xmlhtttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            console.log(data);
            // destroy existing DataTable instance
            if ($.fn.DataTable.isDataTable('#newEmpTable')) {
                $('#newEmpTable').DataTable().destroy();
            }
            $('#newEmpTable').DataTable({
                // use retrieved data as the source for DataTable
                "data": data,
                columns: [
                    {
                        // display full name by combining first and last name fields
                        data: 'first_name',
                        render: function (data, type, row, meta) {
                            console.log(row.first_name, row.last_name);
                            return row.first_name + ' ' + row.last_name;
                        }
                    },
                    { data: 'job_title' },
                    { data: 'department_name'},
                    { data: 'age' },
                    { data: 'doj' },
                    { data: 'city' },
                    { data: 'gender' }
                ],
            });
        }
    }
}

// retrieves data for employee to be deleted
function getDelData() {
    console.log("in del fn");
    var id = document.getElementById("delEmp").value;
    console.log(id);

    var xmlhtttp = new XMLHttpRequest();
    var url = "delEmpInfo.php?id="+id;
    xmlhtttp.open("GET", url, true);
    xmlhtttp.send();
    xmlhtttp.onreadystatechange = function () {
        console.log(this.responseText);
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            console.log(data);
            // destroy existing DataTable instance
            if ($.fn.DataTable.isDataTable('#delEmpTable')) {
                $('#delEmpTable').DataTable().destroy();
            }
            $('#delEmpTable').DataTable({
                // use retrieved data as the source for DataTable
                searching: false,
                paging: false,
                lengthChange: false,
                "info": false,
                "data": data,
                columns: [
                    {
                        // display full name by combining first
                        data: 'first_name',
                        render: function (data, type, row, meta) {
                            console.log(row.first_name, row.last_name);
                            return row.first_name + ' ' + row.last_name;
                        }
                    },
                    { data: 'job_title' },
                    { data: 'department_name'},
                    { data: 'age' },
                    { data: 'doj' },
                    { data: 'city' },
                    { data: 'gender' }
                ],
            });
              // show the "Proceed with removal?" button
              $('#deleteBtn').show();
        }
    }
}
function deleteEmployee() {
    var id = document.getElementById("delEmp").value;
    var xmlhtttp = new XMLHttpRequest();
    var url = "delEmpFinal.php?id=" + id;
    xmlhtttp.open("GET", url, true);
    xmlhtttp.send();
    xmlhtttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            if (response.success) {
                alert("Employee removed successfully!");
                // hide the "Proceed with removal?" button
                $('#deleteBtn').hide();
                // clear the table
                $('#delEmpTable').DataTable().clear().draw();
            } else {
                alert("Error: " + response.message);
            }
        }
    }
}
