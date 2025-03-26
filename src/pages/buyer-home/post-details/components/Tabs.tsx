import React, {
  ComponentProps,
  createContext,
  createRef,
  useContext,
  useMemo,
  useState,
} from "react";
import clsx from "clsx";

type TabProps = {
  children: React.ReactNode;
  hasBottomStyle?: boolean;
} & ComponentProps<"div">;
type TabPanelProps = {
  children: React.ReactNode;
};
type TabsListProps = ComponentProps<"div">;
type TabsProps = {
  children: React.ReactNode;
  tabKey: string;
  selectedTab?: number;
  setSelectedTabIndex?: (index: number) => void;
};

const TabContext = createContext<{
  key: string;
  id: string;
  role: string;
  "aria-setsize": number;
  "aria-posinset": number;
  "aria-selected": boolean;
  "aria-controls": string;
  tabIndex: number;
  onClick: () => void;
} | null>(null);
const TabListContext = createContext<{
  selected: number;
  onTabChange: (index: number) => void;
  tabsId: string;
} | null>(null);
const TabPanelContext = createContext<{
  role: string;
  id: string;
  "aria-labelledby": string;
} | null>(null);

export const useTab = () => {
  const tabData = useContext(TabContext);
  if (tabData == null) {
    throw Error("A Tab must have a TabList parent");
  }
  return tabData;
};

export const useTabPanel = () => {
  const tabPanelData = useContext(TabPanelContext);
  if (tabPanelData == null) {
    throw Error("A TabPanel must have a Tabs parent");
  }
  return tabPanelData;
};

export const useTabList = () => {
  const tabListData = useContext(TabListContext);
  if (tabListData == null) {
    throw Error("A TabList must have a Tabs parent");
  }
  return tabListData;
};

const Tab = ({ children, className, hasBottomStyle = false }: TabProps) => {
  const tabAttributes = useTab();
  return (
    <div
      className={clsx(
        "cursor-pointer pb-2",
        tabAttributes["aria-selected"] && hasBottomStyle
          ? "border-b-primary border-b"
          : "",
        className,
      )}
      {...tabAttributes}
    >
      {children}
    </div>
  );
};

const TabPanel = ({ children }: TabPanelProps) => {
  const tabPanelAttributes = useTabPanel();
  return <div {...tabPanelAttributes}>{children}</div>;
};

const TabsList = ({ children, className }: TabsListProps) => {
  // provided by top level Tabs component coming up next
  const { tabsId, selected, onTabChange } = useTabList();

  // store a reference to the DOM element so we can select via id and manage the focus states
  const ref = createRef<HTMLDivElement>();

  const selectTabByIndex = (index: number) => {
    const selectedTab = ref.current?.querySelector(`[id=${tabsId}-${index}]`);
    if (selectedTab == null) {
      return;
    }
    (selectedTab as HTMLElement).focus();
    onTabChange(index);
  };

  return (
    <div
      className={clsx(
        "flex flex-row justify-between md:border-b md:border-b-stone-300",
        className,
      )}
      role="tablist"
      ref={ref}
    >
      {React.Children.map(children, (child, index) => {
        const isSelected = index === selected;
        return (
          <TabContext.Provider
            value={{
              key: `${tabsId}-${index}`,
              id: `${tabsId}-${index}`,
              role: "tab",
              "aria-setsize": length,
              "aria-posinset": index + 1,
              "aria-selected": isSelected,
              "aria-controls": `${tabsId}-${index}-tab`,
              tabIndex: isSelected ? 0 : -1,
              onClick: () => selectTabByIndex(index),
            }}
          >
            {child}
          </TabContext.Provider>
        );
      })}
    </div>
  );
};

const Tabs = ({
  children,
  tabKey,
  selectedTab,
  setSelectedTabIndex,
}: TabsProps) => {
  const [selectedTabIndex, _setSelectedTabIndex] = useState(0);
  const childrenArray = React.Children.toArray(children);
  const [tabList, ...tabPanels] = childrenArray;

  const onTabChange = (index: number) => {
    _setSelectedTabIndex(index);
    setSelectedTabIndex?.(index);
  };

  const selectedDefaultTab = useMemo(
    () => (selectedTab == null ? selectedTabIndex : selectedTab),
    [selectedTab, selectedTabIndex],
  );

  return (
    <>
      <TabListContext.Provider
        value={{
          selected: selectedDefaultTab,
          onTabChange,
          tabsId: tabKey,
        }}
      >
        {tabList}
      </TabListContext.Provider>
      <TabPanelContext.Provider
        value={{
          role: "tabpanel",
          id: `${tabKey}-${selectedDefaultTab}-tab`,
          "aria-labelledby": `${tabKey}-${selectedDefaultTab}`,
        }}
      >
        {tabPanels[selectedDefaultTab]}
      </TabPanelContext.Provider>
    </>
  );
};

export { Tab, TabPanel, Tabs, TabsList };
