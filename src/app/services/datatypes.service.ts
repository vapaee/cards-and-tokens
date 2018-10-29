/*
export interface InventoryI {
    // API
    // 
}
export interface AlbumI {
    // API
    // 
}
*/

export interface BackgroundLayer {
    url?:string,
    position?:string,
    repeat?:string,
    size?:string,
    "blend-mode"?: string;
}

export interface ContainerCtrl {
    // API
    // 
}

export interface SlotI {
    // loadCopy(copy:any);
    // API
    // 
}


export interface SlotMap {
    [key: string]: Slot;
}

export interface Slot {
    ctrl:SlotI,
    index?:number,
    page?:number,
    slot?:number,
    copy?:any
}
export interface Page {
    slots:Slot[],
    index?:number
}

export interface Container {
    id?:number,
    ctrl:ContainerCtrl,
    // pages:Page[],
    slots:SlotMap,
    current:number
}

export interface FinallyComments {
    loadFromSteemitUrl: Function,
    loadThread: Function,
    appendTo: Function,
    directThreadLink: Function,
    loadEmbed: Function,
    init: Function    
}

// STEEM -------------------
export interface SteemJs {
    api:SteemApi,
    auth: SteemAuth,
    broadcast: SteemBroadcast,
    formatter: SteemFormatter,
    memo: SteemMemo,
    config: SteemConfig,
    utils: SteemUtils
}

export interface SteemMemo {
    decode: Function,
    encode: Function
}

export interface SteemConfig {
    transport: string,
    websocket: string,
    uri: string,
    url: string,
    dev_uri: string,
    stage_uri: string,
    address_prefix: string,
    chain_id: string,
    Config: any
}

export interface SteemUtils {
    camelCase: Function,
    validateAccountName: Function
}

export interface SteemAuth {
    verify: Function,
    generateKeys: Function,
    getPrivateKeys: Function,
    isWif: Function,
    toWif: Function,
    wifIsValid: Function,
    wifToPublic: Function,
    isPubkey: Function,
    signTransaction: Function
}

export interface SteemBroadcast {
    send: Function,
    _prepareTransaction: Function,
    voteWith: Function,
    vote: Function,
    commentWith: Function,
    comment: Function,
    transferWith: Function,
    transfer: Function,
    transferToVestingWith: Function,
    transferToVesting: Function,
    withdrawVestingWith: Function,
    withdrawVesting: Function,
    limitOrderCreateWith: Function,
    limitOrderCreate: Function,
    limitOrderCancelWith: Function,
    limitOrderCancel: Function,
    priceWith: Function,
    price: Function,
    feedPublishWith: Function,
    feedPublish: Function,
    convertWith: Function,
    convert: Function,
    accountCreateWith: Function,
    accountCreate: Function,
    accountUpdateWith: Function,
    accountUpdate: Function,
    witnessUpdateWith: Function,
    witnessUpdate: Function,
    accountWitnessVoteWith: Function,
    accountWitnessVote: Function,
    accountWitnessProxyWith: Function,
    accountWitnessProxy: Function,
    powWith: Function,
    pow: Function,
    customWith: Function,
    custom: Function,
    deleteCommentWith: Function,
    deleteComment: Function,
    customJsonWith: Function,
    customJson: Function,
    commentOptionsWith: Function,
    commentOptions: Function,
    setWithdrawVestingRouteWith: Function,
    setWithdrawVestingRoute: Function,
    limitOrderCreate2With: Function,
    limitOrderCreate2: Function,
    challengeAuthorityWith: Function,
    challengeAuthority: Function,
    proveAuthorityWith: Function,
    proveAuthority: Function,
    requestAccountRecoveryWith: Function,
    requestAccountRecovery: Function,
    recoverAccountWith: Function,
    recoverAccount: Function,
    changeRecoveryAccountWith: Function,
    changeRecoveryAccount: Function,
    escrowTransferWith: Function,
    escrowTransfer: Function,
    escrowDisputeWith: Function,
    escrowDispute: Function,
    escrowReleaseWith: Function,
    escrowRelease: Function,
    pow2With: Function,
    pow2: Function,
    escrowApproveWith: Function,
    escrowApprove: Function,
    transferToSavingsWith: Function,
    transferToSavings: Function,
    transferFromSavingsWith: Function,
    transferFromSavings: Function,
    cancelTransferFromSavingsWith: Function,
    cancelTransferFromSavings: Function,
    customBinaryWith: Function,
    customBinary: Function,
    declineVotingRightsWith: Function,
    declineVotingRights: Function,
    resetAccountWith: Function,
    resetAccount: Function,
    setResetAccountWith: Function,
    setResetAccount: Function,
    claimRewardBalanceWith: Function,
    claimRewardBalance: Function,
    delegateVestingSharesWith: Function,
    delegateVestingShares: Function,
    accountCreateWithDelegationWith: Function,
    accountCreateWithDelegation: Function,
    fillConvertRequestWith: Function,
    fillConvertRequest: Function,
    commentRewardWith: Function,
    commentReward: Function,
    liquidityRewardWith: Function,
    liquidityReward: Function,
    interestWith: Function,
    interest: Function,
    fillVestingWithdrawWith: Function,
    fillVestingWithdraw: Function,
    fillOrderWith: Function,
    fillOrder: Function,
    fillTransferFromSavingsWith: Function,
    fillTransferFromSavings: Function,
    addAccountAuth: Function,
    removeAccountAuth: Function,
    addKeyAuth: Function,
    removeKeyAuth: Function,
    sendAsync: Function,
    voteWithAsync: Function,
    voteAsync: Function,
    commentWithAsync: Function,
    commentAsync: Function,
    transferWithAsync: Function,
    transferAsync: Function,
    transferToVestingWithAsync: Function,
    transferToVestingAsync: Function,
    withdrawVestingWithAsync: Function,
    withdrawVestingAsync: Function,
    limitOrderCreateWithAsync: Function,
    limitOrderCreateAsync: Function,
    limitOrderCancelWithAsync: Function,
    limitOrderCancelAsync: Function,
    priceWithAsync: Function,
    priceAsync: Function,
    feedPublishWithAsync: Function,
    feedPublishAsync: Function,
    convertWithAsync: Function,
    convertAsync: Function,
    accountCreateWithAsync: Function,
    accountCreateAsync: Function,
    accountUpdateWithAsync: Function,
    accountUpdateAsync: Function,
    witnessUpdateWithAsync: Function,
    witnessUpdateAsync: Function,
    accountWitnessVoteWithAsync: Function,
    accountWitnessVoteAsync: Function,
    accountWitnessProxyWithAsync: Function,
    accountWitnessProxyAsync: Function,
    powWithAsync: Function,
    powAsync: Function,
    customWithAsync: Function,
    customAsync: Function,
    deleteCommentWithAsync: Function,
    deleteCommentAsync: Function,
    customJsonWithAsync: Function,
    customJsonAsync: Function,
    commentOptionsWithAsync: Function,
    commentOptionsAsync: Function,
    setWithdrawVestingRouteWithAsync: Function,
    setWithdrawVestingRouteAsync: Function,
    limitOrderCreate2WithAsync: Function,
    limitOrderCreate2Async: Function,
    challengeAuthorityWithAsync: Function,
    challengeAuthorityAsync: Function,
    proveAuthorityWithAsync: Function,
    proveAuthorityAsync: Function,
    requestAccountRecoveryWithAsync: Function,
    requestAccountRecoveryAsync: Function,
    recoverAccountWithAsync: Function,
    recoverAccountAsync: Function,
    changeRecoveryAccountWithAsync: Function,
    changeRecoveryAccountAsync: Function,
    escrowTransferWithAsync: Function,
    escrowTransferAsync: Function,
    escrowDisputeWithAsync: Function,
    escrowDisputeAsync: Function,
    escrowReleaseWithAsync: Function,
    escrowReleaseAsync: Function,
    pow2WithAsync: Function,
    pow2Async: Function,
    escrowApproveWithAsync: Function,
    escrowApproveAsync: Function,
    transferToSavingsWithAsync: Function,
    transferToSavingsAsync: Function,
    transferFromSavingsWithAsync: Function,
    transferFromSavingsAsync: Function,
    cancelTransferFromSavingsWithAsync: Function,
    cancelTransferFromSavingsAsync: Function,
    customBinaryWithAsync: Function,
    customBinaryAsync: Function,
    declineVotingRightsWithAsync: Function,
    declineVotingRightsAsync: Function,
    resetAccountWithAsync: Function,
    resetAccountAsync: Function,
    setResetAccountWithAsync: Function,
    setResetAccountAsync: Function,
    claimRewardBalanceWithAsync: Function,
    claimRewardBalanceAsync: Function,
    delegateVestingSharesWithAsync: Function,
    delegateVestingSharesAsync: Function,
    accountCreateWithDelegationWithAsync: Function,
    accountCreateWithDelegationAsync: Function,
    fillConvertRequestWithAsync: Function,
    fillConvertRequestAsync: Function,
    commentRewardWithAsync: Function,
    commentRewardAsync: Function,
    liquidityRewardWithAsync: Function,
    liquidityRewardAsync: Function,
    interestWithAsync: Function,
    interestAsync: Function,
    fillVestingWithdrawWithAsync: Function,
    fillVestingWithdrawAsync: Function,
    fillOrderWithAsync: Function,
    fillOrderAsync: Function,
    fillTransferFromSavingsWithAsync: Function,
    fillTransferFromSavingsAsync: Function,
    addAccountAuthAsync: Function,
    removeAccountAuthAsync: Function,
    addKeyAuthAsync: Function,
    removeKeyAuthAsync: Function
}

export interface SteemFormatter {
    reputation: Function,
    vestToSteem: Function,
    commentPermlink: Function,
    amount: Function,
    numberWithCommas: Function,
    vestingSteem: Function,
    estimateAccountValue: Function,
    createSuggestedPassword: Function
}

export interface SteemApi {
    _events: object,
    _maxListeners: any,
    _transportType: string, // "http"
    transport: object, // HttpTransport
    options: object, // Config
    seqNo:number,
    setSubscribeCallbackWith: Function,
    setSubscribeCallback: Function,
    setSubscribeCallbackWithAsync: Function,
    setSubscribeCallbackAsync: Function,
    setPendingTransactionCallbackWith: Function,
    setPendingTransactionCallback: Function,
    setPendingTransactionCallbackWithAsync: Function,
    setPendingTransactionCallbackAsync: Function,
    setBlockAppliedCallbackWith: Function,
    setBlockAppliedCallback: Function,
    setBlockAppliedCallbackWithAsync: Function,
    setBlockAppliedCallbackAsync: Function,
    cancelAllSubscriptionsWith: Function,
    cancelAllSubscriptions: Function,
    cancelAllSubscriptionsWithAsync: Function,
    cancelAllSubscriptionsAsync: Function,
    getTrendingTagsWith: Function,
    getTrendingTags: Function,
    getTrendingTagsWithAsync: Function,
    getTrendingTagsAsync: Function,
    getTagsUsedByAuthorWith: Function,
    getTagsUsedByAuthor: Function,
    getTagsUsedByAuthorWithAsync: Function,
    getTagsUsedByAuthorAsync: Function,
    getPostDiscussionsByPayoutWith: Function,
    getPostDiscussionsByPayout: Function,
    getPostDiscussionsByPayoutWithAsync: Function,
    getPostDiscussionsByPayoutAsync: Function,
    getCommentDiscussionsByPayoutWith: Function,
    getCommentDiscussionsByPayout: Function,
    getCommentDiscussionsByPayoutWithAsync: Function,
    getCommentDiscussionsByPayoutAsync: Function,
    getDiscussionsByTrendingWith: Function,
    getDiscussionsByTrending: Function,
    getDiscussionsByTrendingWithAsync: Function,
    getDiscussionsByTrendingAsync: Function,
    getDiscussionsByTrending30With: Function,
    getDiscussionsByTrending30: Function,
    getDiscussionsByTrending30WithAsync: Function,
    getDiscussionsByTrending30Async: Function,
    getDiscussionsByCreatedWith: Function,
    getDiscussionsByCreated: Function,
    getDiscussionsByCreatedWithAsync: Function,
    getDiscussionsByCreatedAsync: Function,
    getDiscussionsByActiveWith: Function,
    getDiscussionsByActive: Function,
    getDiscussionsByActiveWithAsync: Function,
    getDiscussionsByActiveAsync: Function,
    getDiscussionsByCashoutWith: Function,
    getDiscussionsByCashout: Function,
    getDiscussionsByCashoutWithAsync: Function,
    getDiscussionsByCashoutAsync: Function,
    getDiscussionsByPayoutWith: Function,
    getDiscussionsByPayout: Function,
    getDiscussionsByPayoutWithAsync: Function,
    getDiscussionsByPayoutAsync: Function,
    getDiscussionsByVotesWith: Function,
    getDiscussionsByVotes: Function,
    getDiscussionsByVotesWithAsync: Function,
    getDiscussionsByVotesAsync: Function,
    getDiscussionsByChildrenWith: Function,
    getDiscussionsByChildren: Function,
    getDiscussionsByChildrenWithAsync: Function,
    getDiscussionsByChildrenAsync: Function,
    getDiscussionsByHotWith: Function,
    getDiscussionsByHot: Function,
    getDiscussionsByHotWithAsync: Function,
    getDiscussionsByHotAsync: Function,
    getDiscussionsByFeedWith: Function,
    getDiscussionsByFeed: Function,
    getDiscussionsByFeedWithAsync: Function,
    getDiscussionsByFeedAsync: Function,
    getDiscussionsByBlogWith: Function,
    getDiscussionsByBlog: Function,
    getDiscussionsByBlogWithAsync: Function,
    getDiscussionsByBlogAsync: Function,
    getDiscussionsByCommentsWith: Function,
    getDiscussionsByComments: Function,
    getDiscussionsByCommentsWithAsync: Function,
    getDiscussionsByCommentsAsync: Function,
    getDiscussionsByPromotedWith: Function,
    getDiscussionsByPromoted: Function,
    getDiscussionsByPromotedWithAsync: Function,
    getDiscussionsByPromotedAsync: Function,
    getBlockHeaderWith: Function,
    getBlockHeader: Function,
    getBlockHeaderWithAsync: Function,
    getBlockHeaderAsync: Function,
    getBlockWith: Function,
    getBlock: Function,
    getBlockWithAsync: Function,
    getBlockAsync: Function,
    getOpsInBlockWith: Function,
    getOpsInBlock: Function,
    getOpsInBlockWithAsync: Function,
    getOpsInBlockAsync: Function,
    getStateWith: Function,
    getState: Function,
    getStateWithAsync: Function,
    getStateAsync: Function,
    getTrendingCategoriesWith: Function,
    getTrendingCategories: Function,
    getTrendingCategoriesWithAsync: Function,
    getTrendingCategoriesAsync: Function,
    getBestCategoriesWith: Function,
    getBestCategories: Function,
    getBestCategoriesWithAsync: Function,
    getBestCategoriesAsync: Function,
    getActiveCategoriesWith: Function,
    getActiveCategories: Function,
    getActiveCategoriesWithAsync: Function,
    getActiveCategoriesAsync: Function,
    getRecentCategoriesWith: Function,
    getRecentCategories: Function,
    getRecentCategoriesWithAsync: Function,
    getRecentCategoriesAsync: Function,
    getConfigWith: Function,
    getConfig: Function,
    getConfigWithAsync: Function,
    getConfigAsync: Function,
    getDynamicGlobalPropertiesWith: Function,
    getDynamicGlobalProperties: Function,
    getDynamicGlobalPropertiesWithAsync: Function,
    getDynamicGlobalPropertiesAsync: Function,
    getChainPropertiesWith: Function,
    getChainProperties: Function,
    getChainPropertiesWithAsync: Function,
    getChainPropertiesAsync: Function,
    getFeedHistoryWith: Function,
    getFeedHistory: Function,
    getFeedHistoryWithAsync: Function,
    getFeedHistoryAsync: Function,
    getCurrentMedianHistoryPriceWith: Function,
    getCurrentMedianHistoryPrice: Function,
    getCurrentMedianHistoryPriceWithAsync: Function,
    getCurrentMedianHistoryPriceAsync: Function,
    getWitnessScheduleWith: Function,
    getWitnessSchedule: Function,
    getWitnessScheduleWithAsync: Function,
    getWitnessScheduleAsync: Function,
    getHardforkVersionWith: Function,
    getHardforkVersion: Function,
    getHardforkVersionWithAsync: Function,
    getHardforkVersionAsync: Function,
    getNextScheduledHardforkWith: Function,
    getNextScheduledHardfork: Function,
    getNextScheduledHardforkWithAsync: Function,
    getNextScheduledHardforkAsync: Function,
    getKeyReferencesWith: Function,
    getKeyReferences: Function,
    getKeyReferencesWithAsync: Function,
    getKeyReferencesAsync: Function,
    getAccountsWith: Function,
    getAccounts: Function,
    getAccountsWithAsync: Function,
    getAccountsAsync: Function,
    getAccountReferencesWith: Function,
    getAccountReferences: Function,
    getAccountReferencesWithAsync: Function,
    getAccountReferencesAsync: Function,
    lookupAccountNamesWith: Function,
    lookupAccountNames: Function,
    lookupAccountNamesWithAsync: Function,
    lookupAccountNamesAsync: Function,
    lookupAccountsWith: Function,
    lookupAccounts: Function,
    lookupAccountsWithAsync: Function,
    lookupAccountsAsync: Function,
    getAccountCountWith: Function,
    getAccountCount: Function,
    getAccountCountWithAsync: Function,
    getAccountCountAsync: Function,
    getConversionRequestsWith: Function,
    getConversionRequests: Function,
    getConversionRequestsWithAsync: Function,
    getConversionRequestsAsync: Function,
    getAccountHistoryWith: Function,
    getAccountHistory: Function,
    getAccountHistoryWithAsync: Function,
    getAccountHistoryAsync: Function,
    getOwnerHistoryWith: Function,
    getOwnerHistory: Function,
    getOwnerHistoryWithAsync: Function,
    getOwnerHistoryAsync: Function,
    getRecoveryRequestWith: Function,
    getRecoveryRequest: Function,
    getRecoveryRequestWithAsync: Function,
    getRecoveryRequestAsync: Function,
    getEscrowWith: Function,
    getEscrow: Function,
    getEscrowWithAsync: Function,
    getEscrowAsync: Function,
    getWithdrawRoutesWith: Function,
    getWithdrawRoutes: Function,
    getWithdrawRoutesWithAsync: Function,
    getWithdrawRoutesAsync: Function,
    getAccountBandwidthWith: Function,
    getAccountBandwidth: Function,
    getAccountBandwidthWithAsync: Function,
    getAccountBandwidthAsync: Function,
    getSavingsWithdrawFromWith: Function,
    getSavingsWithdrawFrom: Function,
    getSavingsWithdrawFromWithAsync: Function,
    getSavingsWithdrawFromAsync: Function,
    getSavingsWithdrawToWith: Function,
    getSavingsWithdrawTo: Function,
    getSavingsWithdrawToWithAsync: Function,
    getSavingsWithdrawToAsync: Function,
    getOrderBookWith: Function,
    getOrderBook: Function,
    getOrderBookWithAsync: Function,
    getOrderBookAsync: Function,
    getOpenOrdersWith: Function,
    getOpenOrders: Function,
    getOpenOrdersWithAsync: Function,
    getOpenOrdersAsync: Function,
    getLiquidityQueueWith: Function,
    getLiquidityQueue: Function,
    getLiquidityQueueWithAsync: Function,
    getLiquidityQueueAsync: Function,
    getTransactionHexWith: Function,
    getTransactionHex: Function,
    getTransactionHexWithAsync: Function,
    getTransactionHexAsync: Function,
    getTransactionWith: Function,
    getTransaction: Function,
    getTransactionWithAsync: Function,
    getTransactionAsync: Function,
    getRequiredSignaturesWith: Function,
    getRequiredSignatures: Function,
    getRequiredSignaturesWithAsync: Function,
    getRequiredSignaturesAsync: Function,
    getPotentialSignaturesWith: Function,
    getPotentialSignatures: Function,
    getPotentialSignaturesWithAsync: Function,
    getPotentialSignaturesAsync: Function,
    verifyAuthorityWith: Function,
    verifyAuthority: Function,
    verifyAuthorityWithAsync: Function,
    verifyAuthorityAsync: Function,
    verifyAccountAuthorityWith: Function,
    verifyAccountAuthority: Function,
    verifyAccountAuthorityWithAsync: Function,
    verifyAccountAuthorityAsync: Function,
    getActiveVotesWith: Function,
    getActiveVotes: Function,
    getActiveVotesWithAsync: Function,
    getActiveVotesAsync: Function,
    getAccountVotesWith: Function,
    getAccountVotes: Function,
    getAccountVotesWithAsync: Function,
    getAccountVotesAsync: Function,
    getContentWith: Function,
    getContent: Function,
    getContentWithAsync: Function,
    getContentAsync: Function,
    getContentRepliesWith: Function,
    getContentReplies: Function,
    getContentRepliesWithAsync: Function,
    getContentRepliesAsync: Function,
    getDiscussionsByAuthorBeforeDateWith: Function,
    getDiscussionsByAuthorBeforeDate: Function,
    getDiscussionsByAuthorBeforeDateWithAsync: Function,
    getDiscussionsByAuthorBeforeDateAsync: Function,
    getRepliesByLastUpdateWith: Function,
    getRepliesByLastUpdate: Function,
    getRepliesByLastUpdateWithAsync: Function,
    getRepliesByLastUpdateAsync: Function,
    getWitnessesWith: Function,
    getWitnesses: Function,
    getWitnessesWithAsync: Function,
    getWitnessesAsync: Function,
    getWitnessByAccountWith: Function,
    getWitnessByAccount: Function,
    getWitnessByAccountWithAsync: Function,
    getWitnessByAccountAsync: Function,
    getWitnessesByVoteWith: Function,
    getWitnessesByVote: Function,
    getWitnessesByVoteWithAsync: Function,
    getWitnessesByVoteAsync: Function,
    lookupWitnessAccountsWith: Function,
    lookupWitnessAccounts: Function,
    lookupWitnessAccountsWithAsync: Function,
    lookupWitnessAccountsAsync: Function,
    getWitnessCountWith: Function,
    getWitnessCount: Function,
    getWitnessCountWithAsync: Function,
    getWitnessCountAsync: Function,
    getActiveWitnessesWith: Function,
    getActiveWitnesses: Function,
    getActiveWitnessesWithAsync: Function,
    getActiveWitnessesAsync: Function,
    getMinerQueueWith: Function,
    getMinerQueue: Function,
    getMinerQueueWithAsync: Function,
    getMinerQueueAsync: Function,
    getRewardFundWith: Function,
    getRewardFund: Function,
    getRewardFundWithAsync: Function,
    getRewardFundAsync: Function,
    getVestingDelegationsWith: Function,
    getVestingDelegations: Function,
    getVestingDelegationsWithAsync: Function,
    getVestingDelegationsAsync: Function,
    loginWith: Function,
    login: Function,
    loginWithAsync: Function,
    loginAsync: Function,
    getApiByNameWith: Function,
    getApiByName: Function,
    getApiByNameWithAsync: Function,
    getApiByNameAsync: Function,
    getVersionWith: Function,
    getVersion: Function,
    getVersionWithAsync: Function,
    getVersionAsync: Function,
    getFollowersWith: Function,
    getFollowers: Function,
    getFollowersWithAsync: Function,
    getFollowersAsync: Function,
    getFollowingWith: Function,
    getFollowing: Function,
    getFollowingWithAsync: Function,
    getFollowingAsync: Function,
    getFollowCountWith: Function,
    getFollowCount: Function,
    getFollowCountWithAsync: Function,
    getFollowCountAsync: Function,
    getFeedEntriesWith: Function,
    getFeedEntries: Function,
    getFeedEntriesWithAsync: Function,
    getFeedEntriesAsync: Function,
    getFeedWith: Function,
    getFeed: Function,
    getFeedWithAsync: Function,
    getFeedAsync: Function,
    getBlogEntriesWith: Function,
    getBlogEntries: Function,
    getBlogEntriesWithAsync: Function,
    getBlogEntriesAsync: Function,
    getBlogWith: Function,
    getBlog: Function,
    getBlogWithAsync: Function,
    getBlogAsync: Function,
    getAccountReputationsWith: Function,
    getAccountReputations: Function,
    getAccountReputationsWithAsync: Function,
    getAccountReputationsAsync: Function,
    getRebloggedByWith: Function,
    getRebloggedBy: Function,
    getRebloggedByWithAsync: Function,
    getRebloggedByAsync: Function,
    getBlogAuthorsWith: Function,
    getBlogAuthors: Function,
    getBlogAuthorsWithAsync: Function,
    getBlogAuthorsAsync: Function,
    broadcastTransactionWith: Function,
    broadcastTransaction: Function,
    broadcastTransactionWithAsync: Function,
    broadcastTransactionAsync: Function,
    broadcastTransactionWithCallbackWith: Function,
    broadcastTransactionWithCallback: Function,
    broadcastTransactionWithCallbackWithAsync: Function,
    broadcastTransactionWithCallbackAsync: Function,
    broadcastTransactionSynchronousWith: Function,
    broadcastTransactionSynchronous: Function,
    broadcastTransactionSynchronousWithAsync: Function,
    broadcastTransactionSynchronousAsync: Function,
    broadcastBlockWith: Function,
    broadcastBlock: Function,
    broadcastBlockWithAsync: Function,
    broadcastBlockAsync: Function,
    setMaxBlockAgeWith: Function,
    setMaxBlockAge: Function,
    setMaxBlockAgeWithAsync: Function,
    setMaxBlockAgeAsync: Function,
    getTickerWith: Function,
    getTicker: Function,
    getTickerWithAsync: Function,
    getTickerAsync: Function,
    getVolumeWith: Function,
    getVolume: Function,
    getVolumeWithAsync: Function,
    getVolumeAsync: Function,
    getMarketOrderBookWith: Function,
    getMarketOrderBook: Function,
    getMarketOrderBookWithAsync: Function,
    getMarketOrderBookAsync: Function,
    getTradeHistoryWith: Function,
    getTradeHistory: Function,
    getTradeHistoryWithAsync: Function,
    getTradeHistoryAsync: Function,
    getRecentTradesWith: Function,
    getRecentTrades: Function,
    getRecentTradesWithAsync: Function,
    getRecentTradesAsync: Function,
    getMarketHistoryWith: Function,
    getMarketHistory: Function,
    getMarketHistoryWithAsync: Function,
    getMarketHistoryAsync: Function,
    getMarketHistoryBucketsWith: Function,
    getMarketHistoryBuckets: Function,
    getMarketHistoryBucketsWithAsync: Function,
    getMarketHistoryBucketsAsync: Function,
    callAsync: Function,
    signedCallAsync: Function,
    Steem: Function,
    setMaxListeners: Function,
    emit: Function,
    addListener: Function,
    on: Function,
    once: Function,
    removeListener: Function,
    removeAllListeners: Function,
    listeners: Function,
    listenerCount: Function,
}