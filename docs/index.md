# Hello vitePress

```html
<ok-person></ok-person>
```

## 导入代码块

<<< ./docs/.vitepress/components/person-cell.vue{5-10}

## 示例

<person-cell></person-cell>

<ok-person :person="{id: '500',
name: '第二个测试',
userName: 'liuzhe',
orgName: 'HRBP-产品技术运营-北京',
email: 'masiwei@kuaishou.com'}"></ok-person>

### 参数

| 参数   | 说明     | 类型               | 默认值 |
| ------ | -------- | ------------------ | ------ |
| person | 人员信息 | [Person](/#Person) | 单元格 |
| 单元格 | 单元格   | 单元格             | 单元格 |

### Person

```typescript
interface Person {
  id: string | number
  name: string
  userName: string
  orgName: string
  email: string
}
```
