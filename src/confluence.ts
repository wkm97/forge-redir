
import api, { route } from "@forge/api";
import {Content, Space} from '@servicerocket/conf-cloud-utils';

export const getContentsBySpaceKey = async(spaceKey: string): Promise<Content[]> => {
  if(!spaceKey){
    throw new Error('SpaceKey not available')
  }
  const queryParams = new URLSearchParams({
    spaceKey
  });

  const response = await (await api.asUser().requestConfluence(route`/wiki/rest/api/content?${queryParams}`)).json()
  const contents = response.results as Content[]
  return contents
}

export const getContentById = async(id:string): Promise<Content> => {
  if(!id){
    throw new Error('Content ID is not available')
  }
  const response = await (await api.asUser().requestConfluence(route`/wiki/rest/api/content/${id}`)).json()
  return response as Content
}

export const getAllSpaces = async(): Promise<Space[]> => {
    const response = await (await api.asUser().requestConfluence(route`/wiki/rest/api/space`)).json()
    const spaces = response.results as Space[]
    return spaces;
}