import GitVersionListButton from './src/GitVersionListButton.vue'
import GitVersionList from './src/GitVersionList.vue'
import GitVersionListItem from './src/GitVersionListItem.vue'

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

export { GitVersionList, GitVersionListItem, GitVersionListButton }
