import React, { useState, useEffect } from "react";
import { MDBDataTableV5 } from "mdbreact";

export default function Spins(props) {
  const { facade } = props;

  const defaultSpinList = {
    columns: [
      {
        label: "Id",
        field: "id",
        width: 150,
        sort: "enabled",
        attributes: {
          "aria-controls": "DataTable",
          "aria-label": "Name",
        },
      },
      {
        label: "Fields",
        field: "fieldNumbers",
        sort: "enabled",
        width: 270,
      },
      {
        label: "Arch Size",
        field: "arcSize",
        sort: "enabled",
        width: 270,
      },
      {
        label: "Top",
        field: "top",
        sort: "enabled",
        width: 270,
      },
      {
        label: "Off Set",
        field: "offSet",
        sort: "enabled",
        width: 270,
      },
      {
        label: "Rotate",
        field: "rotate",
        sort: "enabled",
        width: 270,
      },
      {
        label: "Array Number",
        field: "resultNumber",
        sort: "enabled",
        width: 270,
      },
      {
        label: "Prize Name",
        field: "resultName",
        sort: "enabled",
        width: 270,
      },
      {
        label: "Prize Value",
        field: "resultValue",
        sort: "enabled",
        width: 270,
      },
    ],
    rows: [],
  };

  const [spinList, setSpinList] = useState({ ...defaultSpinList });

  useEffect(() => {
    console.log("hello");

    facade.getAllSpins((list) => {
      console.log(list);
      defaultSpinList.rows = [...list];
      setSpinList({ ...defaultSpinList });
    });
  }, []);

  // const [datatable, setDatatable] = React.useState();

  return (
    <div className="container">
      {/* {console.log(playerList)} */}
      <div className="row">
        {/* <div className="col-md-1"></div> */}
        <div className="col-md-12">
          <h3 className="text-center">Spin Stats</h3>
          <br />
          <MDBDataTableV5
            hover
            entriesOptions={[10, 25, 50]}
            entries={10}
            pagesAmount={4}
            data={spinList}
            fullPagination
          />
        </div>
        {/* <div className="col-md-1"></div> */}
      </div>
    </div>
  );
}
