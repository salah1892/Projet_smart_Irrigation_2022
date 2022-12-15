import React from "react";
import GetAll from "./dataBase_Function/GetAll";
import GetAllTable from "./dataBase_Function/GetAllTable";
export default function MainStatistic() {

    return (
        <div className="statistic--main">
            <h1 className="title--statistic">Data From MongoDB</h1>
            <section>
                <GetAllTable />
            </section>

        </div>
    )
}
