import { ResponsiveLine } from "@nivo/line";

const ComparisonsGraph = ({
  compoundData,
}: {
  compoundData: {
    id: string;
    data: {
      x: number;
      y: number;
    }[];
  }[];
}) => {
  return (
    <div className="aspect-[1] md:aspect-video mx-10">
      <ResponsiveLine
        data={compoundData}
        margin={{ top: 10, right: 40, bottom: 40, left: 40 }}
        xScale={{
          type: "linear",
          min: "auto",
          max: "auto",
        }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: false,
          reverse: false,
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickPadding: 5,
        }}
        curve="monotoneX"
        colors={["#2563eb", "#e11d48", "#10b981", "#f59e0b", "#3b82f6"]}
        pointSize={6}
        useMesh={true}
        gridYValues={6}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        enableSlices="x"
      />
    </div>
  );
};

export default ComparisonsGraph;
