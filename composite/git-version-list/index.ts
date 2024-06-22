export { default as GitVersionListButton } from './src/GitVersionListButton.vue'
export { default as GitVersionList } from './src/GitVersionList.vue'
export { default as GitVersionListItem } from './src/GitVersionListItem.vue'
export { prefix as GitVersionListPrefix } from './src/common'

export interface GitVersionListProps {
  data: Array<GitVersionListItemProps>
  selectGitVersion: (id: GitVersionListItemProps['id']) => void
}

export interface GitVersionListItemProps {
  id: string
  title: string
  description: string
  icon?: string
}
