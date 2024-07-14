import Discussion from '../discussions';

export const findAllDiscussions = async () => {
  return await Discussion.find().populate('movie author comments');
};

export const findDiscussionById = async (id) => {
  return await Discussion.findById(id).populate('movie author comments');
};

export const createDiscussion = async (discussionData) => {
  const discussion = new Discussion(discussionData);
  return await discussion.save();
};

export const updateDiscussion = async (id, discussionData) => {
  return await Discussion.findByIdAndUpdate(id, discussionData, { new: true });
};

export const deleteDiscussion = async (id) => {
  return await Discussion.findByIdAndDelete(id);
};
