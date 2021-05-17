import React, { useEffect } from "react";
import {
  newsSelector,
  newsInfo,
  hasLoaded_,
  newsServicethunk,
} from "../reducers/newsReducer";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";

function formatDate(dateVal) {
  function padValue(value) {
    return value < 10 ? "0" + value : value;
  }
  if (!dateVal) return "";

  var d = new Date(dateVal);
  var sMonth = padValue(d.getMonth() + 1);
  var sDay = padValue(d.getDate());
  var sYear = d.getFullYear();

  var hour =
    d.getHours() == 0
      ? 12
      : d.getHours() > 12
      ? d.getHours() - 12
      : d.getHours();
  var min = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
  var ampm = d.getHours() < 12 ? "AM" : "PM";
  var time = padValue(hour) + ":" + min + " " + ampm;

  return sMonth + "/" + sDay + "/" + sYear + " " + time;
}

const News = () => {
  const hasLoaded = useSelector(hasLoaded_);
  const news = useSelector(newsInfo);
  const dispatch = useDispatch();
  const columns = [
    {
      field: "urlToImage",
      headerName: "Image",
      renderCell: (params) => (
        <div style={{ display: "flex" }}>
          <img
            src={params.row.urlToImage}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      ),
    },
    { field: "author", headerName: "Author", width: 250 },
    {
      field: "source",
      headerName: "Source",
      width: 200,
      valueFormatter: (params) => {
        return params.value.name;
      },
    },
    { field: "title", headerName: "Title", width: 750 },
    {
      field: "publishedAt",
      headerName: "Date",
      width: 300,
      valueFormatter: (params) => {
        return formatDate(params.row.publishedAt);
      },
    },
    {
      field: "url",
      headerName: "URL",
      width: 100,
      renderCell: (params) => (
        <div>
          <Link href={params.row.url}>Click</Link>
        </div>
      ),
    },
  ];

  const [datarows, setdatarows] = React.useState([]);
  const [rowdatawithid, setrowdatawithid] = React.useState([]);

  useEffect(() => {
    if (!hasLoaded) {
      dispatch(newsServicethunk());
    } else {
      asigndatatogrid();
    }
  }, [hasLoaded]);

  const asigndatatogrid = () => {
    var articles = JSON.parse(JSON.stringify(news));

    for (var i = 0; i < articles.length; i++) {
      articles[i].id = i;
    }
    console.log(articles);
    setrowdatawithid(articles);
    setdatarows(articles);
  };
  const filterbasedonsearch = (search) => {
    if (search.length > 0) {
      debugger;
      var articles = JSON.parse(JSON.stringify(rowdatawithid));
      var filteredarraydata = [];
      articles.filter((data) => {
        if (
          data.title.toLowerCase().includes(search.toLowerCase()) ||
          data.description.toLowerCase().includes(search.toLowerCase())
        ) {
          filteredarraydata.push(data);
        }
      });
      setdatarows([...filteredarraydata]);
    } else {
      asigndatatogrid();
    }
  };
  return (
    <div style={{ width: "90vw", margin: "0 auto", height: "680px" }}>
      <div>
        {" "}
        <TextField
          id="standard-basic"
          label="Search"
          style={{ width: "100%" }}
          onChange={(e) => {
            filterbasedonsearch(e.target.value);
          }}
        />
        &nbsp; &nbsp; &nbsp; &nbsp;
      </div>
      <DataGrid
        rows={datarows}
        columns={columns}
        // rowHeight={100}
        autoPageSize="true"
        disableColumnMenu="true"
        sortingOrder={["desc", "asc"]}
        sortModel={[
          {
            field: "publishedAt",
            sort: "desc",
          },
        ]}
        // hideFooter={true}
        pagination
        pageSize={10}
        // rowCount={100}
      />
    </div>
  );
};

export default News;
