const AccountSettings = () => {
  return (
    <div className="w-full flex flex-col gap-4 md:gap-[32px] px-[48px] py-[32px] bg-gray">
      <div className="w-full flex flex-col pb-4 md:pb-[32px] gap-[48px]">
        <p className="text-[20px] text-black font-medium leading-[30px]">
          Account settings
        </p>
      </div>
      <div className="w-full flex flex-col gap-[42px] px-[26px] py-[33px]">
        <div className="w-full flex flex-col md:flex-row gap-4 md:gap-0">
          <div className="w-full md:w-1/4">
            <p className="text-[16px] text-customTextGray font-normal leading-[24px]">
              Change Password
            </p>
          </div>
          <div className="w-full md:w-3/4 flex flex-row gap-[16px]  flex-wrap items-center">
            <button className="w-fit h-[48px] rounded-[6px] bg-secondary px-[24px]">
              <p className="text-[16px] text-white font-semibold leading-[24px]">
                Change
              </p>
            </button>
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row gap-4 md:gap-0">
          <div className="w-full md:w-1/4">
            <p className="text-[16px] text-customTextGray font-normal leading-[24px]">
              Delete account
            </p>
          </div>
          <div className="w-full md:w-3/4 flex flex-row gap-[16px]  flex-wrap items-center">
            <button className="w-fit h-[48px] rounded-[6px] bg-white border-[1px] border-[#949494] px-[24px]">
              <p className="text-[16px] text-customBgGray font-semibold leading-[24px]>Delete account">
                Delete account
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
