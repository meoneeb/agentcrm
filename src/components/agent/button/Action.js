export default function ButtonAction({ agentProfile }) {
  return (
    <div className="flex flex-row flex-wrap gap-4 grid grid-cols-1 md:grid-cols-3 ">
      {agentProfile.action.map((button, index) => (
        <a
          href={button.url}
          target="_blank"
          key={index}
          className="group flex flex-row justify-start items-center gap-4 px-8 py-6 border-2 border-solid border-neutral-200 rounded-xl shadow-lg hover:shadow-blue-500/20 hover:border-blue-600 hover:scale-105 transition-all cursor-pointer"
        >
          <i
            className={`fi ${button.icon} text-2xl text-neutral-500 group-hover:text-blue-600`}
          ></i>
          <div className="flex flex-col">
            <p className="text-xl font-medium text-neutral-500 group-hover:text-blue-600">
              {button.label}
            </p>
            <p className="text-neutral-500 group-hover:text-blue-600">
              {button.label2}
            </p>
          </div>
        </a>
      ))}
    </div>
  );
}
