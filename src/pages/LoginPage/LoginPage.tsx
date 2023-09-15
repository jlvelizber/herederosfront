import { LoginForm } from "../../components";

export const LoginPage = () => {
  return (
    <div className="flex flex-wrap items-center h-screen">
      <div className="xl:w-1/2 w-full mx-auto  dark:border-strokedark dark:bg-boxdark rounded-sm border border-stroke bg-white shadow-default">
        <div className="w-full border-stroke dark:border-strokedark xl:w-full xl:border-l-2">
          <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
            <span className="mb-1.5 block font-medium">
              Registro de Herederos
            </span>
            <h2 className="mb-9 text-center text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
              Ingreso
            </h2>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};
