import React, { useState, FormEvent, ChangeEvent } from 'react';
import styles from './index.module.scss';
import ConfirmModal from '../../components/ConfirmModal';
import Post from '../../components/Post';
import GroupPageDropdown from '../../components/GroupPage/dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import InfoModal from '../../components/GroupPage/infoModal';
import PlusIcon from '../../components/PlusIcon';

// TYPES & INTERFACES
export type MembershipStatus = 'none' | 'requested' | 'joined';

export interface Group {
  id: number;
  name: string;
  location: string;
  category: string;
  description: string;
  isPublic: boolean;
  imageUrl: string;
  membershipStatus: MembershipStatus;
  members: number;
  isCreator: boolean;
}

export interface Member {
  id: number;
  name: string;
  userimgsrc: string;
}

// SAMPLE DATA

// Group 1 now has 45 members
const initialGroups: Group[] = [
  {
    id: 1,
    name: 'New Dog Owners',
    location: 'Calgary, AB',
    category: 'Dogs',
    description: 'A group for new dog owners to share tips and experiences.',
    isPublic: true,
    imageUrl: '/images/dog.jpg',
    membershipStatus: 'none',
    members: 45,
    isCreator: false,
  },
  {
    id: 2,
    name: 'Moose Crew',
    location: 'Banff, AB',
    category: 'Wildlife',
    description: 'Enthusiasts of moose sightings and wildlife exploration.',
    isPublic: false,
    imageUrl: '/images/moose.jpg',
    membershipStatus: 'none',
    members: 30,
    isCreator: false,
  },
];

const groupPosts: { [groupId: number]: { id: number; content: string }[] } = {
  1: [{ id: 1, content: 'Check out my new puppy!' }],
  2: [{ id: 1, content: 'Moose spotted by the river today.' }],
};

const animalTypes: string[] = [
  'Dogs',
  'Cats',
  'Birds',
  'Fish',
  'Reptiles',
  'Amphibians',
  'Small Mammals',
  'Insects',
  'Wildlife',
  'Exotic Animals',
];

const mainUser: Member = {
  id: 1,
  name: 'John',
  userimgsrc: '/images/JohnProfilePicture.png',
};

// COMPONENTS

// CreateGroupForm
interface CreateGroupFormProps {
  onCreateGroup: (group: Group) => void;
  onCancel: () => void;
}

const CreateGroupForm: React.FC<CreateGroupFormProps> = ({
  onCreateGroup,
  onCancel,
}) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('Please Select...');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState('');
  const [formError, setFormError] = useState('');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim() || !category.trim()) {
      setFormError('Please fill in all required fields.');
      setTimeout(() => setFormError(''), 3000);
      return;
    }
    const imageUrl = previewImage || '/images/default-group.jpg';
    const newGroup: Group = {
      id: Date.now(),
      name,
      location,
      category,
      description,
      isPublic,
      imageUrl,
      membershipStatus: 'joined',
      members: 1,
      isCreator: true,
    };
    onCreateGroup(newGroup);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.createGroupForm}>
      {formError && <div className={styles.notification}>{formError}</div>}
      <h2>Create a Group</h2>
      <label>
        Title <span className={styles.required}>*</span>
      </label>
      <input
        type="text"
        className={styles.formInput}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Group Name"
        required
      />
      <label>
        Description <span className={styles.required}>*</span>
      </label>
      <textarea
        className={styles.formTextarea}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Group Description"
        required
      />
      <label>Location</label>
      <input
        type="text"
        className={styles.formInput}
        value={location}
        placeholder="Location"
        onChange={(e) => setLocation(e.target.value)}
      />
      <label>
        Animal Type <span className={styles.required}>*</span>
      </label>
      <GroupPageDropdown
        label="Please select..."
        allDropdownOptions={['Please select...', ...animalTypes]}
        selectedDropdownOption={category}
        setSelectedDropdownOption={setCategory}
        inline
      />
      {/* <select
        className={styles.formSelect}
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="">Select an Animal Type</option>
        {animalTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select> */}
      <label>Group Image</label>
      <input
        type="file"
        accept="image/*"
        className={styles.formInput}
        onChange={handleFileChange}
      />
      {previewImage && (
        <img
          src={previewImage}
          alt="Group Preview"
          style={{
            maxWidth: '200px',
            maxHeight: '200px',
            objectFit: 'cover',
            marginTop: '10px',
            borderRadius: '6px',
          }}
        />
      )}
      <label>Joining Policy</label>
      <div className={styles.radioGroup}>
        <label>
          <input
            type="radio"
            checked={isPublic}
            onChange={() => setIsPublic(true)}
          />
          Public
        </label>
        <label>
          <input
            type="radio"
            checked={!isPublic}
            onChange={() => setIsPublic(false)}
          />
          Invite Only
        </label>
      </div>
      <div className={styles.buttonRow}>
        <button
          type="submit"
          className={`${styles.button} ${styles.buttonPrimary}`}
        >
          Save
        </button>
        <button
          type="button"
          className={`${styles.button} ${styles.buttonSecondary}`}
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

// CreatePostForm
interface CreatePostFormProps {
  onCreatePost: (content: string) => void;
  onCancel: () => void;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({
  onCreatePost,
  onCancel,
}) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onCreatePost(content.trim());
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.createPostForm}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your post here..."
        style={{
          fontSize: '16px',
          minHeight: '100px',
          padding: '10px',
          width: '-moz-available; -webkit-fill-available;',
        }}
        required
      />
      <div
        className={styles.buttonRow}
        style={{ justifyContent: 'end', flexDirection: 'row-reverse' }}
      >
        <button
          type="submit"
          className={`${styles.button} ${styles.buttonPrimary}`}
        >
          Post
        </button>
        <button
          type="button"
          onClick={onCancel}
          className={`${styles.button} ${styles.buttonSecondary}`}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

// CreatePostModal
interface CreatePostModalProps extends CreatePostFormProps {}

const CreatePostModal: React.FC<CreatePostModalProps> = ({
  onCreatePost,
  onCancel,
}) => (
  <div className={styles.popupOverlay}>
    <div className={styles.popup}>
      <CreatePostForm onCreatePost={onCreatePost} onCancel={onCancel} />
    </div>
  </div>
);

// MembersModal
interface MembersModalProps {
  visible: boolean;
  members: Member[];
  onClose: () => void;
}

const MembersModal: React.FC<MembersModalProps> = ({
  visible,
  members,
  onClose,
}) => {
  if (!visible) return null;
  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popup}>
        <h2>Group Members</h2>
        <div className={styles.membersListContainer}>
          <ul className={styles.membersList}>
            {members.map((member) => (
              <li key={member.id} className={styles.memberItem}>
                <img
                  src={member.userimgsrc}
                  alt={member.name}
                  className={styles.memberAvatar}
                />
                <span>{member.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={onClose}
          className={`${styles.button} ${styles.buttonPrimary}`}
        >
          Close
        </button>
      </div>
    </div>
  );
};

// GroupDetails
export interface GroupDetailsProps {
  group: Group;
  membersList: Member[];
  onLeaveGroup: (groupId: number) => void;
  onDeleteGroup: (groupId: number) => void;
  onClose: () => void;
  notify: (message: string) => void;
}

const GroupDetails: React.FC<GroupDetailsProps> = ({
  group,
  membersList,
  onLeaveGroup,
  onDeleteGroup,
  onClose,
  notify,
}) => {
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showMembersModal, setShowMembersModal] = useState(false);
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const [postsState, setPostsState] = useState<
    { id: number; content: string }[]
  >(groupPosts[group.id] || []);

  const handleLeaveClick = () => setShowLeaveConfirm(true);
  const handleDeleteClick = () => setShowDeleteConfirm(true);

  const handleConfirmLeave = () => {
    setShowLeaveConfirm(false);
    onLeaveGroup(group.id);
    notify('You have left the group successfully!');
  };

  const handleConfirmDelete = () => {
    setShowDeleteConfirm(false);
    onDeleteGroup(group.id);
    notify('Group deleted successfully!');
  };

  const handleCreatePost = (content: string) => {
    const newPost = { id: Date.now(), content };
    setPostsState((prev) => [newPost, ...prev]);
    setShowCreatePostModal(false);
  };

  return (
    <div className={styles.groupDetailsContainer}>
      <button onClick={onClose} className={styles.backButton}>
        &larr; Back
      </button>
      <ConfirmModal
        visible={showLeaveConfirm}
        title="Leave Group"
        message="Are you sure you want to leave this group? You will no longer see its posts."
        confirmLabel="Yes, leave"
        cancelLabel="Cancel"
        onConfirm={handleConfirmLeave}
        onCancel={() => setShowLeaveConfirm(false)}
      />
      <ConfirmModal
        visible={showDeleteConfirm}
        title="Delete Group"
        message="Are you sure you want to delete this group? This action cannot be undone."
        confirmLabel="Yes, delete"
        cancelLabel="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowDeleteConfirm(false)}
      />
      <MembersModal
        visible={showMembersModal}
        members={membersList}
        onClose={() => setShowMembersModal(false)}
      />
      <img
        src={group.imageUrl}
        alt={group.name}
        className={styles.groupProfileImage}
      />
      <div className={styles.groupDetailsHeader}>
        <h2 className={styles.groupName}>{group.name}</h2>
        <div className={styles.groupDetailsLocation}>
          {group.location} |{' '}
          <button
            className={styles.membersButtonDetails}
            onClick={() => setShowMembersModal(true)}
          >
            {group.members} members
          </button>
        </div>
      </div>
      <div className={styles.groupActions}>
        <button
          className={`${styles.button} ${styles.buttonPrimary}`}
          onClick={() => setShowCreatePostModal(true)}
        >
          Create Post
        </button>
        {group.isCreator ? (
          <button
            className={`${styles.button} ${styles.buttonSecondary}`}
            onClick={handleDeleteClick}
          >
            Delete Group
          </button>
        ) : (
          <button
            className={`${styles.button} ${styles.buttonSecondary}`}
            onClick={handleLeaveClick}
          >
            Leave Group
          </button>
        )}
      </div>
      <div className={styles.postsContainer}>
        <h3>Posts</h3>
        {postsState.length === 0 ? (
          <p className={styles.noPosts}>No posts yet.</p>
        ) : (
          postsState.map((p) => (
            <div key={p.id} className={styles.postWrapper}>
              <Post
                user="John The Vet"
                title=""
                text={p.content}
                isSponsored={false}
                isSaved={false}
                eventLink=""
                shopLink=""
                media=""
                link=""
                userimgsrc="/images/JohnProfilePicture.png"
                timestamp={new Date('2025-03-25T12:00:00Z')}
              />
            </div>
          ))
        )}
      </div>
      {showCreatePostModal && (
        <CreatePostModal
          onCreatePost={handleCreatePost}
          onCancel={() => setShowCreatePostModal(false)}
        />
      )}
    </div>
  );
};

// Main GroupsPage Component
const GroupsPage: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>(initialGroups);
  const [notification, setNotification] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [animalTypeFilter, setAnimalTypeFilter] = useState('');
  const [groupTypeFilter, setGroupTypeFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [infoModalContent, setInfoModalContent] = useState({
    title: '',
    message: '',
  });

  const isFilterApplied =
    animalTypeFilter || groupTypeFilter || locationFilter || searchText !== '';

  const [showMembersModal, setShowMembersModal] = useState(false);
  const [currentMembers, setCurrentMembers] = useState<Member[]>([]);

  // For group 1, start with John plus 44 dummy members.
  const [groupMembers, setGroupMembers] = useState<{ [key: number]: Member[] }>(
    {
      1: [
        mainUser,
        ...Array.from({ length: 44 }, (_, i) => ({
          id: i + 2,
          name: `Member ${i + 2}`,
          userimgsrc: '/images/default-avatar.png',
        })),
      ],
    },
  );

  const notify = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleJoinGroup = (groupId: number) => {
    setGroups((prev) =>
      prev.map((g) =>
        g.id === groupId
          ? { ...g, membershipStatus: 'joined', members: g.members + 1 }
          : g,
      ),
    );
    setGroupMembers((prev) => {
      const current = prev[groupId] || [];
      if (!current.some((member) => member.id === mainUser.id)) {
        return { ...prev, [groupId]: [mainUser, ...current] };
      }
      return prev;
    });
    notify('You have joined the group successfully!');
  };

  const handleCancelRequest = (groupId: number) => {
    setGroups((prev) =>
      prev.map((g) =>
        g.id === groupId ? { ...g, membershipStatus: 'none' } : g,
      ),
    );
    notify('Your request has been canceled successfully!');
  };

  const handleRequestInvite = (groupId: number) => {
    setGroups((prev) =>
      prev.map((g) =>
        g.id === groupId ? { ...g, membershipStatus: 'requested' } : g,
      ),
    );
    notify('Your request has been sent successfully!');
  };

  const handleLeaveGroup = (groupId: number) => {
    setGroups((prev) =>
      prev.map((g) =>
        g.id === groupId
          ? { ...g, membershipStatus: 'none', members: g.members - 1 }
          : g,
      ),
    );
    setGroupMembers((prev) => {
      const newMembers = { ...prev };
      delete newMembers[groupId];
      return newMembers;
    });
    if (selectedGroup && selectedGroup.id === groupId) {
      setSelectedGroup(null);
    }
    notify('You have left the group successfully!');
  };

  const handleDeleteGroup = (groupId: number) => {
    setGroups((prev) => prev.filter((g) => g.id !== groupId));
    setGroupMembers((prev) => {
      const newMembers = { ...prev };
      delete newMembers[groupId];
      return newMembers;
    });
    if (selectedGroup && selectedGroup.id === groupId) {
      setSelectedGroup(null);
    }
    notify('Group deleted successfully!');
  };

  const handleCreateGroup = (newGroup: Group) => {
    setGroups([...groups, newGroup]);
    setGroupMembers((prev) => ({ ...prev, [newGroup.id]: [mainUser] }));
    setShowCreateForm(false);
    notify('Group created successfully!');
  };

  const resetAllFilters = () => {
    setAnimalTypeFilter('');
    setGroupTypeFilter('');
    setLocationFilter('');
    setSearchText('');
  };

  const filteredGroups = groups.filter((group) => {
    const matchesSearch =
      group.name.toLowerCase().includes(searchText.toLowerCase()) ||
      group.description.toLowerCase().includes(searchText.toLowerCase());
    const matchesAnimalType = animalTypeFilter
      ? group.category.toLowerCase() === animalTypeFilter.toLowerCase()
      : true;
    const matchesGroupType = groupTypeFilter
      ? groupTypeFilter === 'Public'
        ? group.isPublic
        : !group.isPublic
      : true;
    const matchesLocation = locationFilter
      ? group.location.toLowerCase().includes(locationFilter.toLowerCase())
      : true;
    return (
      matchesSearch && matchesAnimalType && matchesGroupType && matchesLocation
    );
  });

  const handleOpenGroup = (group: Group) => {
    if (group.membershipStatus === 'joined') {
      setSelectedGroup(group);
    } else {
      setInfoModalContent({
        title: 'Access Restricted',
        message: 'You must join this group to view its posts.',
      });
      setInfoModalVisible(true);
    }
  };

  const handleViewMembers = (groupId: number) => {
    const members = groupMembers[groupId];
    if (
      members &&
      members.length > 0 &&
      groups.find((g) => g.id === groupId)?.membershipStatus === 'joined'
    ) {
      setCurrentMembers(members);
      setShowMembersModal(true);
    } else {
      setInfoModalContent({
        title: 'Members Unavailable',
        message: 'Join this group to view its members.',
      });
      setInfoModalVisible(true);
    }
  };

  const renderMembershipButton = (group: Group) => {
    if (group.membershipStatus === 'joined') {
      return (
        <button
          className={`${styles.button} ${styles.buttonSecondary}`}
          disabled
        >
          Joined
        </button>
      );
    }
    if (group.membershipStatus === 'requested') {
      return (
        <button
          className={`${styles.button} ${styles.buttonSecondary}`}
          onClick={() => handleCancelRequest(group.id)}
        >
          Cancel Request
        </button>
      );
    }
    if (group.isPublic) {
      return (
        <button
          className={`${styles.button} ${styles.buttonPrimary}`}
          onClick={() => handleJoinGroup(group.id)}
        >
          Join
        </button>
      );
    } else {
      return (
        <button
          className={`${styles.button} ${styles.buttonSecondary}`}
          onClick={() => handleRequestInvite(group.id)}
        >
          Request Invite
        </button>
      );
    }
  };

  if (selectedGroup) {
    return (
      <GroupDetails
        group={selectedGroup}
        membersList={groupMembers[selectedGroup.id] || []}
        onLeaveGroup={handleLeaveGroup}
        onDeleteGroup={handleDeleteGroup}
        onClose={() => setSelectedGroup(null)}
        notify={notify}
      />
    );
  }

  return (
    <div className={styles.groupsPage}>
      {notification && (
        <div className={styles.notification}>
          <div>{notification}</div>
        </div>
      )}
      {showCreateForm ? (
        <CreateGroupForm
          onCreateGroup={handleCreateGroup}
          onCancel={() => setShowCreateForm(false)}
        />
      ) : (
        <>
          <div className={styles.pageHeading}>
            <div>Browse Groups</div>
            <div
              className={styles.newGroupButton}
              onClick={() => setShowCreateForm(true)}
            >
              <PlusIcon width={25} height={25} colour={'#454545'} />
              <div className={styles.newGroupText}>New Event</div>
            </div>
          </div>
          <div className={styles.searchBarContainer}>
            <input
              type="text"
              placeholder="Search groups..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <div className={styles.filters}>
            <label
              className={styles.filterLabel}
              onClick={resetAllFilters}
              style={{
                backgroundColor: isFilterApplied
                  ? 'var(--primary-gray)'
                  : 'var(--primary-white)',
                border: isFilterApplied
                  ? '1px solid var(--primary-gray)'
                  : '1px solid black',
              }}
            >
              Filters <FontAwesomeIcon icon={faCircleXmark} />
            </label>
            <GroupPageDropdown
              label="Animal Type"
              allDropdownOptions={animalTypes}
              setSelectedDropdownOption={setAnimalTypeFilter}
              selectedDropdownOption={animalTypeFilter}
            />
            <GroupPageDropdown
              label="Group Type"
              allDropdownOptions={['Public', 'Invite Only']}
              setSelectedDropdownOption={setGroupTypeFilter}
              selectedDropdownOption={groupTypeFilter}
            />
            <GroupPageDropdown
              label="Location"
              allDropdownOptions={['Calgary, AB', 'Banff, AB']}
              setSelectedDropdownOption={setLocationFilter}
              selectedDropdownOption={locationFilter}
            />
          </div>
          <div className={styles.groupsList}>
            {filteredGroups.map((group) => (
              <div key={group.id} className={styles.groupCard}>
                <img
                  src={group.imageUrl}
                  alt={group.name}
                  className={styles.groupCardImage}
                  onClick={() => handleOpenGroup(group)}
                />
                <div className={styles.groupCardContent}>
                  <div
                    className={styles.groupCardTitle}
                    onClick={() => handleOpenGroup(group)}
                  >
                    {group.name}
                  </div>
                  <div className={styles.groupCardLocation}>
                    {group.location} |{' '}
                    <button
                      className={styles.membersButton}
                      onClick={() => handleViewMembers(group.id)}
                    >
                      {group.members} members
                    </button>
                  </div>
                  <div className={styles.groupCardDescription}>
                    {group.description}
                  </div>
                  {renderMembershipButton(group)}
                </div>
              </div>
            ))}
          </div>
          <MembersModal
            visible={showMembersModal}
            members={currentMembers}
            onClose={() => setShowMembersModal(false)}
          />
        </>
      )}
      <InfoModal
        visible={infoModalVisible}
        title={infoModalContent.title}
        message={infoModalContent.message}
        onClose={() => setInfoModalVisible(false)}
      />
    </div>
  );
};

export default GroupsPage;
