"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const camelcase_keys_1 = __importDefault(require("camelcase-keys"));
const github_base_1 = __importDefault(require("github-base"));
exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }, options) => {
    const github = new github_base_1.default(options);
    const contributors = (await github
        .paged(`/repos/:${options.repo}/contributors`)
        .then((res) => res.pages))
        .flat()
        .map((page) => page.body)
        .flat();
    const logins = contributors.map(node => node.login);
    const profiles = await Promise.all(logins.map(login => github.get(`/users/${login}`).then((res) => res.body)));
    const loginToProfile = Object.fromEntries(profiles.map(profile => [profile.login, profile]));
    contributors.forEach(node => {
        const profile = loginToProfile[node.login];
        return actions.createNode({
            ...camelcase_keys_1.default(node),
            name: profile.name,
            url: profile.blog || profile.html_url,
            id: createNodeId(node.id),
            internal: {
                type: "GitHubContributor",
                contentDigest: createContentDigest('' + node.id)
            }
        });
    });
};
