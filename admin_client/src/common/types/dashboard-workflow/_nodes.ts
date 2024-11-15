import type { NamedExoticComponent, PropsWithChildren } from "react";

import type { Node as _Node, NodeProps as _NodeProps } from "@xyflow/react";

export enum CustomNodeTypeName {
  blank = "blank",
  start = "start",
  message = "message",
  resizable = "resizable",
  condition = "condition",
  code = "code",
}

export type CustomNodeType = _Node<CustomNodeDataType, CustomNodeTypeName>;

export type CustomNodeDataType = {
  label?: string /** 注解信息 */;
  form?: {
    value: CustomNodeDataFormValueType;
    isValid: boolean;
  };
  isMultipleConnectionSources?: boolean /** 节点是否有多个结束连接点 ( source → sourceHandle ) */;
};

export type CustomNodeComponentsType = Record<
  CustomNodeTypeName,
  NamedExoticComponent<CustomNodeProps>
>;

export type CustomNodeMenuListItemType = {
  type: CustomNodeTypeName;
};

export type CustomNodeWrapperProps = PropsWithChildren<CustomNodeProps>;

export type CustomNodeProps = _NodeProps<CustomNodeType>;

export type CustomNodeDataFormValueType = Record<string, unknown> & {
  title: string;
  items?: Array<{
    id: number;
    title: string;
  }>;
};
